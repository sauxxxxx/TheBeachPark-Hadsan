// Client-provided Beach Park rate sheet, received October 2026.
// Availability, final quotes, and booking terms remain with the property/Exely.
export const rateSheetDate = 'October 2026'

export const beachEntrance = {
  regular: 225,
  discounted: 180,
  discountGroups: ['Filipino locals', 'PWD guests', 'Senior citizens', 'Students'],
  children: [
    { height: '3.5 ft and below', price: 'Free' },
    { height: '3.6–4.5 ft', price: '₱90 per person' },
    { height: '4.5 ft and above', price: 'Regular rate' },
  ],
}

export const poolEntrance = {
  regular: 200,
  hours: [
    { days: 'Weekdays', hours: '9:00 AM–5:00 PM' },
    { days: 'Weekends', hours: '9:00 AM–8:00 PM' },
  ],
}

export const beachAmenities = [
  { name: 'Table setup', options: [{ price: 500, capacity: 4 }] },
  { name: 'Nipa hut', options: [{ price: 1800, capacity: 15 }] },
  { name: 'Amakan', options: [
    { price: 1500, capacity: 10, label: 'Per block', includes: '2 tables and 10 chairs' },
    { price: 3000, capacity: 20, label: 'Whole', includes: '4 tables and 20 chairs' },
  ] },
  { name: 'Beachside cabana', options: [{ price: 1500, capacity: 10, includes: 'Big foam' }] },
  { name: 'Small tent', options: [{ price: 1500, capacity: 10, includes: '2 tables and 10 chairs' }] },
  { name: 'Medium tent', options: [{ price: 1700, capacity: 15, includes: '3 tables and 15 chairs' }] },
  { name: 'Big tent', options: [{ price: 3000, capacity: 20, includes: '4 tables and 20 chairs' }] },
  { name: 'Pavilion tent', options: [
    { price: 1700, capacity: 15, label: 'Per block', includes: '3 tables and 15 chairs' },
    { price: 8500, capacity: 75, label: 'Whole', includes: '15 tables and 75 chairs' },
  ] },
  { name: 'SeaBreeze', options: [{ price: 12000, capacity: 100, includes: '25 tables and 100 chairs' }] },
]

export const amenityAddOns = [
  { name: 'Additional table', price: 300 },
  { name: 'Additional chair', price: 30 },
]

export const overnightRooms = [
  { slug: 'beachside-barkada-room', name: 'Beachside Barkada', capacity: 8, weekdayRoom: 3800, weekdayBreakfast: 4500, weekendBreakfast: 7000 },
  { slug: 'barkada-oceanfront-deck', name: 'Oceanfront Deck Barkada', capacity: 7, weekdayRoom: 4400, weekdayBreakfast: 5000, weekendBreakfast: 10000 },
  { slug: 'barkada-beach-house', name: 'Barkada Beach House', capacity: 8, weekdayRoom: 5000, weekdayBreakfast: 6500, weekendBreakfast: 8500 },
  { slug: 'barkada-poolside-balcony', name: 'Poolside Barkada', capacity: 8, weekdayRoom: 4000, weekdayBreakfast: 4500, weekendBreakfast: 6500 },
  { slug: 'pool-villa', name: 'Pool Villa', capacity: 6, weekdayRoom: 4500, weekdayBreakfast: 5500, weekendBreakfast: 8500 },
  { slug: 'beach-side-room', name: 'Beachside Balcony', capacity: 3, weekdayRoom: 2500, weekdayBreakfast: 2900, weekendBreakfast: 4000 },
  { slug: 'oceanfront-deck-room', name: 'Oceanfront Deck Room', capacity: 3, weekdayRoom: 3000, weekdayBreakfast: 3600, weekendBreakfast: 4700 },
  { slug: 'beach-house-room', name: 'Beach House', capacity: 3, weekdayRoom: 2800, weekdayBreakfast: 3300, weekendBreakfast: 5000 },
  { slug: 'pool-side-balcony-room', name: 'Poolside Balcony Room', capacity: 4, weekdayRoom: 2500, weekdayBreakfast: 3000, weekendBreakfast: 4500 },
  { slug: 'double-room', name: 'Double Room', capacity: 2, weekdayRoom: 1300, weekdayBreakfast: 1500, weekendBreakfast: 1999 },
]

export const dayUseRooms = [
  { slug: 'beach-house-room', name: 'Beach House', capacity: 3, price: 2400, beds: '1 double bed and 1 single bed; private balcony' },
  { slug: 'barkada-beach-house', name: 'Barkada Beach House', capacity: 8, price: 3000, beds: '2 double bunk beds; private balcony' },
  { slug: 'pool-side-balcony-room', name: 'Poolside Balcony Room', capacity: 4, price: 2200, beds: '2 double beds' },
  { slug: 'barkada-poolside-balcony', name: 'Poolside Barkada', capacity: 8, price: 3600, beds: '2 double bunk beds' },
  { slug: 'pool-villa', name: 'Pool Villa', capacity: 6, price: 3999, beds: '1 private queen bed and 1 double bunk bed' },
]

export const waterSports = [
  { name: 'Stand-up paddle', rates: '₱800 / hour · ₱300 / 30 minutes' },
  { name: 'Single kayak', rates: '₱500 / hour · ₱300 / 30 minutes' },
  { name: 'Double tandem kayak', rates: '₱800 / hour · ₱400 / 30 minutes' },
  { name: 'Water bike', rates: '₱1,000 / hour · ₱500 / 30 minutes · ₱250 / 15 minutes' },
  { name: 'Floating mat', rates: 'Small ₱200 · Big ₱500 / 2 hours', note: 'The supplied sheet does not specify the small mat duration.' },
  { name: 'Speedboat tour', rates: '₱6,000 / 2 hours', note: '5–7 guests' },
  { name: 'Bandwagon', rates: '₱699 / person', note: 'Minimum 3 guests' },
  { name: 'UFO ride', rates: '₱499 / person', note: 'Minimum 4 guests' },
  { name: 'Banana boat', rates: '₱430 / person · 15 minutes', note: 'Minimum 5, maximum 8 guests' },
  { name: 'Jet ski tour', rates: '₱5,000 / hour · ₱2,800 / 30 minutes · ₱1,700 / 15 minutes' },
  { name: 'Knee & wake board rental', rates: '₱5,500 / hour · ₱2,750 / 30 minutes · ₱1,325 / 15 minutes' },
  { name: 'Parasailing', rates: '₱2,000 / person · 15 minutes' },
  { name: 'Life vest rental', rates: '₱200 / person', note: 'Until 5:00 PM only' },
  { name: 'Bangka tour', rates: '₱7,500 for 7–10 · ₱8,500 for 10–15 · ₱9,000 for 15–30 guests' },
]

export const foodPackage = {
  inclusions: ['1 appetizer', '2 main dishes', '1 noodle or pasta dish', '1 vegetable dish', '1 dessert', '1 round of soft drinks', 'Buffet setup', 'Food servers'],
  tiers: [
    { minimum: 50, price: 530 },
    { minimum: 40, price: 560 },
    { minimum: 30, price: 580 },
  ],
}

export const formatPeso = (amount) => `₱${new Intl.NumberFormat('en-PH').format(amount)}`
