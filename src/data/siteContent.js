import bananaBoatGroup from '../assets/images/real/banana-boat-group.webp'
import bananaBoat from '../assets/images/real/banana-boat.webp'
import beachAerial from '../assets/images/real/beach-aerial.webp'
import beachDay from '../assets/images/real/beach-day.webp'
import jetski from '../assets/images/real/jetski.webp'
import kayakFamily from '../assets/images/real/kayak-family.webp'
import poolVilla from '../assets/images/real/pool-villa.webp'
import poolside from '../assets/images/real/poolside.webp'
import roomBarkada from '../assets/images/real/room-barkada.webp'
import roomDouble from '../assets/images/real/room-double.webp'
import roomFamily from '../assets/images/real/room-family.webp'
import speedboatBeach from '../assets/images/real/speedboat-beach.webp'
import waterBike from '../assets/images/real/water-bike.webp'
import adventuresBanana from '../assets/images/waterdog/banana-boat.jpg'
import adventuresJetski from '../assets/images/waterdog/jet-ski-ride.jpg'
import adventuresKayak from '../assets/images/waterdog/paddle-kayak-rental.jpg'
import bandwagonCover from '../assets/images/waterdog/bandwagon.jpg'
import floatingMatsCover from '../assets/images/waterdog/floating-mats.jpg'
import jetSkiTourCover from '../assets/images/waterdog/jet-ski-tour.jpg'
import lifeVestCover from '../assets/images/generated/waterdog/life-vest-rental-v1.jpg'
import paddleKayakTourCover from '../assets/images/generated/waterdog/paddle-kayak-tour-v1.jpg'
import parasailingCover from '../assets/images/generated/waterdog/parasailing-v1.jpg'
import snorkelingMaskCover from '../assets/images/generated/waterdog/snorkeling-mask-v1.jpg'
import speedboatRideCover from '../assets/images/waterdog/speedboat-ride-guest.jpg'
import speedboatTourCover from '../assets/images/waterdog/speedboat-tour.jpg'
import supermanCover from '../assets/images/generated/waterdog/superman-v1.jpg'
import wakeboardingCover from '../assets/images/generated/waterdog/wakeboarding-v1.jpg'

export const property = {
  name: 'The Beach Park Hadsan',
  location: 'Hadsan, Lapu-Lapu City, Cebu',
  phone: '+63 917 303 0755',
  phoneHref: 'tel:+639173030755',
  email: 'thebeachpark.reservations@gmail.com',
  emailHref: 'mailto:thebeachpark.reservations@gmail.com',
  exelyPropertyId: '507010',
}

export const waterdogContact = {
  phone: '0917 1005 085',
  phoneHref: 'tel:+639171005085',
  email: 'waterdogadventurescebu@gmail.com',
  emailHref: 'mailto:waterdogadventurescebu@gmail.com',
}

export const primaryNavigation = [
  { label: 'Stay', to: '/stay/', group: '/stay/' },
  { label: 'Rates', to: '/rates/', group: '/rates/' },
  { label: 'Adventures', to: '/adventures/', group: '/adventures/' },
  { label: 'Experiences', to: '/experiences/', group: '/experiences/' },
  { label: 'Offers', to: '/offers/', group: '/offers/' },
  { label: 'Explore', to: '/explore/about/', group: '/explore/' },
]

// The menu stage. Each destination carries the photograph and the line that
// appear over the image while it is hovered, focused, or current.
export const navDestinations = [
  {
    label: 'Home',
    to: '/',
    group: '/',
    exact: true,
    title: 'The Beach Park',
    caption: 'Hadsan, Lapu-Lapu City — a beach day with room to stay and water to explore.',
    image: beachAerial,
    alt: 'Aerial view of The Beach Park shoreline and clear Cebu water',
  },
  {
    label: 'Stay',
    to: '/stay/',
    group: '/stay/',
    title: 'Sleep close to the fun',
    caption: 'Rooms for couples, families, and the whole barkada.',
    image: roomFamily,
    alt: 'Two-bed room with warm timber furniture at The Beach Park',
  },
  {
    label: 'Rates',
    to: '/rates/',
    group: '/rates/',
    title: 'Plan your beach day',
    caption: 'Entrance, rooms, amenities, adventures, and gatherings.',
    image: beachDay,
    alt: 'Guests enjoying the shore at The Beach Park',
  },
  {
    label: 'Adventures',
    to: '/adventures/',
    group: '/adventures/',
    title: 'Make a little noise',
    caption: 'Jet ski, kayak, banana boat, and the rest of the Waterdog fleet.',
    image: bananaBoatGroup,
    alt: 'Friends riding a banana boat at The Beach Park',
  },
  {
    label: 'Experiences',
    to: '/experiences/',
    group: '/experiences/',
    title: 'Your kind of day',
    caption: 'Family mornings, barkada afternoons, or a slow escape for two.',
    image: beachDay,
    alt: 'Children playing together on The Beach Park shore',
  },
  {
    label: 'Offers',
    to: '/offers/',
    group: '/offers/',
    title: 'Stay a little longer',
    caption: 'Current offers live in the booking engine, kept honest and up to date.',
    image: poolVilla,
    alt: 'Pool villa area at The Beach Park',
  },
  {
    label: 'Gallery',
    to: '/explore/gallery/',
    group: '/explore/gallery/',
    title: 'Real days, real water',
    caption: 'Photographed at The Beach Park.',
    image: kayakFamily,
    alt: 'A parent and child kayaking at The Beach Park',
  },
  {
    label: 'Contact',
    to: '/explore/contact/',
    group: '/explore/contact/',
    title: 'See you in Hadsan',
    caption: 'Directions, opening questions, and the property team.',
    image: poolside,
    alt: 'Poolside grounds and cottages at The Beach Park',
  },
]

export const footerNavigation = [
  { title: 'Stay', links: [{ label: 'Rooms', to: '/stay/' }, { label: 'Rates & day use', to: '/rates/' }, { label: 'Special offers', to: '/offers/' }] },
  { title: 'Adventures', links: [{ label: 'Waterdog Adventures', to: '/adventures/' }, { label: 'Activity details', to: '/adventures/details/jet-ski/' }] },
  { title: 'Experiences', links: [{ label: 'Plan your day', to: '/experiences/' }, { label: 'Gallery', to: '/explore/gallery/' }] },
  { title: 'Explore', links: [{ label: 'Souvenir Shop', to: '/explore/souvenir-shop/' }, { label: 'About', to: '/explore/about/' }, { label: 'Contact & Directions', to: '/explore/contact/' }] },
]

// Room facts come from the booking system; see scripts/sync-rooms.mjs. The
// media layer can safely apply approved presentation imagery without editing
// the generated booking-data file or replacing the verified source photos.
export { roomHeroImageUrl, roomImageFiles, roomImageSourceLabel, roomImageUrl, rooms } from './roomMedia'

// Standard inclusions as published on the property's services page. The booking
// system only populates an amenity list on one room type, so these are stated at
// property level rather than claimed for each room individually.
export const roomAmenities = [
  'Air conditioning',
  'Private shower and toilet',
  'Bath towels',
  'Toiletries',
  'Table and chair',
]

// From thebeachpark.com/special-offers/. Dates are shown so a lapsed promotion
// reads as dated rather than quietly wrong.
export const specialOffers = [
  {
    slug: 'two-nights-free',
    name: 'Book 2 Nights, Get 1 Night Free',
    lede: 'Stay longer, save more, and experience the best of Lapu-Lapu.',
    detail: 'Book two nights and enjoy a third complimentary night.',
    period: 'Promo period: 27 July – 30 September 2026',
    includes: [],
  },
  {
    slug: 'book-now-stay-later',
    name: 'Book Now and Stay Later',
    lede: 'Book early, save more.',
    detail: 'Book seven days or more before your check-in date and receive a 10% discount.',
    period: '',
    includes: [],
  },
  {
    slug: 'best-available-rate',
    name: 'Best Available Rate — Breakfast and Room',
    lede: 'The most flexible rate plan, letting you choose how to pay for a room-only booking.',
    detail: '',
    period: '',
    includes: ['Breakfast for two people', '30 minutes of non-motorised water sports'],
  },
]

export const activityCategories = [
  { id: 'group-rides', name: 'Group rides', description: 'Towable fun for families and barkadas who want to share the splash.' },
  { id: 'powered-adventures', name: 'Powered adventures', description: 'Faster rides, guided tours, and open-water experiences.' },
  { id: 'paddle-activities', name: 'Paddle activities', description: 'Explore close to shore with a paddleboard or kayak.' },
  { id: 'equipment-rental', name: 'Equipment rental', description: 'Simple add-ons for a safer, easier day in the water.' },
]

export const activities = [
  {
    slug: 'banana-boat',
    name: 'Banana Boat',
    category: 'group-rides',
    pace: 'Shared',
    price: '₱430 per person',
    duration: '15 minutes',
    capacity: '5–8 guests',
    image: adventuresBanana,
    alt: 'A barkada group riding a Waterdog banana boat',
    summary: 'A bright group ride made for families and barkadas.',
    details: 'Gather at least five riders and take on a fast, shared run across the water.',
  },
  {
    slug: 'floating-mats',
    name: 'Floating Mats',
    category: 'group-rides',
    pace: 'Easy',
    price: 'Small ₱200 · Big ₱500',
    priceNote: 'Big mat: 2 hours. Small mat duration: confirm with Waterdog.',
    duration: 'Big mat: 2 hours',
    capacity: 'Varies by mat size',
    image: floatingMatsCover,
    alt: 'Filipino friends relaxing on a floating mat near the Hadsan shore',
    summary: 'A relaxed floating option available in different sizes.',
    details: 'Choose a mat size that suits your group and settle into an easy stretch on the water.',
  },
  {
    slug: 'superman',
    name: 'Superman',
    category: 'group-rides',
    pace: 'Fast',
    price: 'Rate on request',
    duration: 'Confirm with Waterdog',
    capacity: 'Confirm with Waterdog',
    image: supermanCover,
    alt: 'Four guests riding the Superman towable at Waterdog Adventures',
    summary: 'A compact towable ride for a small group ready for more speed.',
    details: 'Ask the Waterdog team about the latest ride details and availability.',
  },
  {
    slug: 'bandwagon',
    name: 'Bandwagon',
    category: 'group-rides',
    pace: 'Fast',
    price: '₱699 per person',
    duration: 'Confirm with Waterdog',
    capacity: 'Minimum of 3 guests',
    image: bandwagonCover,
    alt: 'Three friends riding the Bandwagon towable at Waterdog Adventures',
    summary: 'A shared towable ride for a quick burst of sea spray.',
    details: 'Bring at least three riders together for a fast, shared ride. Confirm the ride duration with Waterdog.',
  },
  {
    slug: 'wakeboarding',
    name: 'Wakeboarding',
    category: 'powered-adventures',
    pace: 'Sport',
    price: 'From ₱1,325 / 15 minutes',
    priceNote: 'Knee or wake board: ₱2,750 / 30 minutes · ₱5,500 / hour',
    duration: '15 minutes, 30 minutes, or 1 hour',
    capacity: 'Confirm with Waterdog',
    image: wakeboardingCover,
    alt: 'A wakeboarder riding behind a speedboat near Hadsan',
    summary: 'Choose a knee or wake board session on the water.',
    details: 'The supplied rates cover knee and wake board rental. Confirm operator, equipment, and guest arrangements with Waterdog.',
  },
  {
    slug: 'speedboat-ride',
    name: 'Speedboat Ride',
    category: 'powered-adventures',
    pace: 'Fast',
    price: 'Rate on request',
    duration: 'Confirm with Waterdog',
    capacity: 'Confirm with Waterdog',
    operator: 'Confirm operating arrangement',
    image: speedboatRideCover,
    alt: 'A guest-driven Waterdog speedboat ride near Hadsan',
    summary: 'Ask Waterdog about a speedboat ride for your group.',
    details: 'Ask Waterdog whether a guest-driven speedboat ride is offered and confirm operating requirements before planning.',
  },
  {
    slug: 'speedboat-tour',
    name: 'Speedboat Tour',
    category: 'powered-adventures',
    pace: 'Guided',
    price: '₱6,000 / 2 hours',
    duration: '2 hours',
    capacity: '5–7 guests',
    operator: 'Confirm operating arrangement',
    image: speedboatTourCover,
    alt: 'Waterdog speedboat floating by The Beach Park shore',
    summary: 'Let a Waterdog operator take the wheel and guide the group.',
    details: 'Plan a two-hour speedboat tour for five to seven guests; confirm the route and operating arrangement with Waterdog.',
  },
  {
    slug: 'jet-ski-tour',
    name: 'Jet Ski Tour',
    category: 'powered-adventures',
    pace: 'Guided',
    price: 'From ₱1,700 / 15 minutes',
    priceNote: '₱2,800 / 30 minutes · ₱5,000 / hour',
    duration: '15 minutes, 30 minutes, or 1 hour',
    capacity: 'Confirm with Waterdog',
    operator: 'Confirm operating arrangement',
    image: jetSkiTourCover,
    alt: 'An operator-guided jet ski tour near Hadsan',
    summary: 'Choose a jet ski tour to fit your time on the water.',
    details: 'The supplied jet ski tour rates cover 15 minutes, 30 minutes, and one hour. Confirm the operating arrangement with Waterdog.',
  },
  {
    slug: 'jet-ski',
    name: 'Jet Ski Ride',
    category: 'powered-adventures',
    pace: 'Fast',
    price: 'From ₱1,700 / 15 minutes',
    priceNote: '₱2,800 / 30 minutes · ₱5,000 / hour',
    duration: '15 minutes, 30 minutes, or 1 hour',
    capacity: 'Confirm with Waterdog',
    operator: 'Confirm operating arrangement',
    image: adventuresJetski,
    alt: 'Two guests riding a Waterdog jet ski near The Beach Park',
    summary: 'Choose a quick run or a full hour on the water.',
    details: 'The supplied jet ski tour rates cover three durations. Ask Waterdog whether a separate ride option is available.',
  },
  {
    slug: 'parasailing',
    name: 'Parasailing',
    category: 'powered-adventures',
    pace: 'Airborne',
    price: '₱2,000 per person',
    duration: '15 minutes',
    capacity: 'Confirm with Waterdog',
    image: parasailingCover,
    alt: 'Two guests parasailing above the Hadsan coast',
    summary: 'See the coast from above during a fifteen-minute flight.',
    details: 'Confirm guest requirements and weather conditions with the operating team before launch.',
  },
  {
    slug: 'paddle-kayak-tour',
    name: 'Paddle & Kayak Tour',
    category: 'paddle-activities',
    pace: 'Guided',
    price: 'Rate on request',
    duration: 'Confirm with Waterdog',
    capacity: 'Single or tandem options',
    options: ['Stand-up paddle', 'Red kayak (single)', 'Orange kayak (double tandem)'],
    image: paddleKayakTourCover,
    alt: 'A guided paddleboard and kayak tour near Hadsan',
    summary: 'Follow a guided route by paddleboard, single kayak, or tandem kayak.',
    details: 'Choose your preferred craft, then let the Waterdog team confirm the route and tour arrangements.',
  },
  {
    slug: 'kayak',
    name: 'Paddle & Kayak Rental',
    category: 'paddle-activities',
    pace: 'Easy',
    price: 'From ₱300 / 30 minutes',
    priceNote: 'Paddleboard ₱800/hour; single kayak ₱500/hour; tandem kayak ₱800/hour or ₱400/30 minutes',
    duration: '30 minutes or 1 hour',
    capacity: 'Single or tandem options',
    options: ['Stand-up paddle', 'Red kayak (single)', 'Orange kayak (double tandem)'],
    image: adventuresKayak,
    alt: 'A parent and child kayaking near The Beach Park shore',
    summary: 'Paddle close to shore and take the day at your own rhythm.',
    details: 'Rent a paddleboard, single kayak, or double tandem kayak for 30 minutes or one hour.',
  },
  {
    slug: 'life-vest-rental',
    name: 'Life Vest Rental',
    category: 'equipment-rental',
    pace: 'Rental',
    price: '₱200 per person',
    duration: 'Until 5 PM',
    capacity: 'Individual rental',
    image: lifeVestCover,
    alt: 'Waterdog staff helping a guest fasten a life vest',
    summary: 'Rent a life vest for added confidence during a day by the water.',
    details: 'Life vests are rented per person and may be used until 5 PM, subject to availability.',
  },
  {
    slug: 'snorkeling-mask',
    name: 'Snorkeling Mask Rental',
    category: 'equipment-rental',
    pace: 'Rental',
    price: 'Rate on request',
    duration: 'Confirm with Waterdog',
    capacity: 'Individual rental',
    image: snorkelingMaskCover,
    alt: 'A guest adjusting a snorkeling mask by the Hadsan shore',
    summary: 'Keep a snorkeling mask for the day and explore at your own pace.',
    details: 'Ask Waterdog about current snorkeling mask rental rates and duration.',
  },
]

export const experienceTypes = [
  { title: 'Family beach day', copy: 'Easy mornings, beach time, and something everyone can enjoy.', image: beachDay, alt: 'Children playing together on The Beach Park shore' },
  { title: 'Couples escape', copy: 'A slower day by the sea, with space for the water and sunset.', image: kayakFamily, alt: 'A relaxed kayak ride at The Beach Park' },
  { title: 'Barkada adventure', copy: 'Bring the crew, choose a water activity, and make the day your own.', image: bananaBoatGroup, alt: 'Friends together on a banana boat at The Beach Park' },
  { title: 'Groups & gatherings', copy: 'Shared rooms and connected experiences for time spent together.', image: poolside, alt: 'Poolside grounds at The Beach Park' },
]

export const galleryImages = [
  { src: beachAerial, alt: 'Aerial view of The Beach Park shoreline' },
  { src: beachDay, alt: 'Children playing on The Beach Park shore' },
  { src: poolside, alt: 'Poolside grounds and cottages at The Beach Park' },
  { src: roomDouble, alt: 'Double room at The Beach Park' },
  { src: roomFamily, alt: 'Two-bed room at The Beach Park' },
  { src: roomBarkada, alt: 'Barkada bunk room at The Beach Park' },
  { src: jetski, alt: 'Jet ski activity at The Beach Park' },
  { src: kayakFamily, alt: 'Kayaking at The Beach Park' },
  { src: bananaBoatGroup, alt: 'Banana boat group at The Beach Park' },
  { src: speedboatBeach, alt: 'Waterdog speedboat by the shore' },
  { src: waterBike, alt: 'Water bike on clear water' },
]

export const verifiedImages = {
  beachAerial,
  beachDay,
  poolVilla,
  poolside,
  roomFamily,
  speedboatBeach,
}

export const commonFaqs = [
  { question: 'How do I confirm current rates and availability?', answer: 'View the client-provided rate guide, then contact The Beach Park for availability and a final quote for your dates.' },
  { question: 'Can I plan a day visit without booking a room?', answer: 'Yes. The rate guide lists beach and pool entrance, day-use amenities, and activity prices. Confirm availability and the final quote before visiting.' },
  { question: 'Where is The Beach Park?', answer: 'The Beach Park is in Hadsan, Lapu-Lapu City, Cebu.' },
]
