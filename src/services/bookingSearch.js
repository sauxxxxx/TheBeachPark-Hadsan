const dayMilliseconds = 86400000

export function todayInManila(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

export function dateNumber(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return NaN
  const time = Date.parse(`${value}T00:00:00Z`)
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN
}

export function addDays(value, days) {
  return new Date(dateNumber(value) + days * dayMilliseconds).toISOString().slice(0, 10)
}

export function nightsBetween(checkIn, checkOut) {
  return Math.round((dateNumber(checkOut) - dateNumber(checkIn)) / dayMilliseconds)
}

export function formatBookingDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(dateNumber(value)))
}

export function normalizeBookingSearch(value = {}, today = todayInManila()) {
  const checkIn = Number.isFinite(dateNumber(value.checkIn)) && value.checkIn >= today ? value.checkIn : today
  const checkOut = Number.isFinite(dateNumber(value.checkOut)) && value.checkOut > checkIn ? value.checkOut : addDays(checkIn, 1)
  const adults = Number.isInteger(Number(value.adults)) && Number(value.adults) >= 1 && Number(value.adults) <= 10 ? Number(value.adults) : 2
  const children = Array.isArray(value.children) ? value.children.slice(0, 6).map((age) => (
    age != null && age !== '' && Number.isInteger(Number(age)) && Number(age) >= 0 && Number(age) <= 11 ? Number(age) : ''
  )) : []
  return { checkIn, checkOut, adults, children, promoCode: String(value.promoCode || '').slice(0, 80) }
}

export function bookingSearchFromQuery(query, today = todayInManila()) {
  const checkIn = query.date
  const nights = Number(query.nights)
  return normalizeBookingSearch({
    checkIn,
    checkOut: Number.isFinite(dateNumber(checkIn)) && Number.isInteger(nights) && nights > 0 && nights <= 365 ? addDays(checkIn, nights) : undefined,
    adults: query.adults,
    children: typeof query['children-age'] === 'string' && /^\d+(;\d+)*$/.test(query['children-age']) ? query['children-age'].split(';') : [],
    promoCode: query['access-code'],
  }, today)
}

export function bookingSearchQuery(selection) {
  return {
    date: selection.checkIn,
    nights: String(nightsBetween(selection.checkIn, selection.checkOut)),
    adults: String(selection.adults),
    'children-age': selection.children.filter((age) => age !== '').join(';'),
    'access-code': selection.promoCode.trim(),
  }
}

export function validateBookingSearch(selection, today = todayInManila()) {
  if (!Number.isFinite(dateNumber(selection.checkIn)) || selection.checkIn < today) return 'Choose a check-in date from today onwards.'
  if (!(nightsBetween(selection.checkIn, selection.checkOut) > 0)) return 'Check-out must be after check-in.'
  if (selection.children.some((age) => age === '')) return 'Choose an age for each child.'
  return ''
}
