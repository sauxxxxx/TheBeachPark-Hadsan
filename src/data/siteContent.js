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
  { title: 'Stay', links: [{ label: 'Rooms', to: '/stay/' }, { label: 'Special offers', to: '/offers/' }] },
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
    capacity: 'Minimum of 5 guests',
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
    price: '₱200–₱500',
    priceNote: 'Depending on size',
    duration: '2 hours',
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
    price: '₱430 per person',
    duration: '15 minutes',
    capacity: 'Up to 4 guests',
    image: supermanCover,
    alt: 'Four guests riding the Superman towable at Waterdog Adventures',
    summary: 'A compact towable ride for a small group ready for more speed.',
    details: 'Ride together in a group of up to four for fifteen lively minutes on the water.',
  },
  {
    slug: 'bandwagon',
    name: 'Bandwagon',
    category: 'group-rides',
    pace: 'Fast',
    price: '₱1,500 per ride',
    duration: '15 minutes',
    capacity: 'Up to 3 guests',
    image: bandwagonCover,
    alt: 'Three friends riding the Bandwagon towable at Waterdog Adventures',
    summary: 'A three-person towable ride for a quick burst of sea spray.',
    details: 'Bring up to three riders together for one fast, shared fifteen-minute ride.',
  },
  {
    slug: 'wakeboarding',
    name: 'Wakeboarding',
    category: 'powered-adventures',
    pace: 'Sport',
    price: '₱2,500',
    duration: '30 minutes',
    capacity: '1 guest',
    image: wakeboardingCover,
    alt: 'A wakeboarder riding behind a speedboat near Hadsan',
    summary: 'A focused thirty-minute session for one rider behind the boat.',
    details: 'This one-person activity pairs a board, speedboat, and operating team for a dedicated session.',
  },
  {
    slug: 'speedboat-ride',
    name: 'Speedboat Ride',
    category: 'powered-adventures',
    pace: 'Fast',
    price: '₱5,000–₱8,000',
    duration: '2–4 hours maximum',
    capacity: '7–10 guests',
    operator: 'Guest-driven ride',
    image: speedboatRideCover,
    alt: 'A guest-driven Waterdog speedboat ride near Hadsan',
    summary: 'Take the controls for a longer speedboat experience with your group.',
    details: 'The Speedboat Ride is the guest-driven option for groups of seven to ten, subject to Waterdog approval and operating requirements.',
  },
  {
    slug: 'speedboat-tour',
    name: 'Speedboat Tour',
    category: 'powered-adventures',
    pace: 'Guided',
    price: '₱5,000–₱8,000',
    duration: 'Confirm with Waterdog',
    capacity: '7–10 guests',
    operator: 'Waterdog operator included',
    image: speedboatTourCover,
    alt: 'Waterdog speedboat floating by The Beach Park shore',
    summary: 'Let a Waterdog operator take the wheel and guide the group.',
    details: 'The Speedboat Tour is driven by a Waterdog operator, leaving your group free to enjoy the route and the view.',
  },
  {
    slug: 'jet-ski-tour',
    name: 'Jet Ski Tour',
    category: 'powered-adventures',
    pace: 'Guided',
    price: '₱5,000',
    duration: '1 hour',
    capacity: 'Up to 2 guests',
    operator: 'Waterdog operator included',
    image: jetSkiTourCover,
    alt: 'An operator-guided jet ski tour near Hadsan',
    summary: 'A one-hour guided jet ski outing for one or two guests.',
    details: 'Ride with a Waterdog operator for a longer guided experience beyond a standard jet ski session.',
  },
  {
    slug: 'jet-ski',
    name: 'Jet Ski Ride',
    category: 'powered-adventures',
    pace: 'Fast',
    price: '₱1,700–₱5,000',
    duration: '15 minutes, 30 minutes, or 1 hour',
    capacity: 'Up to 2 guests',
    operator: 'With or without operator',
    image: adventuresJetski,
    alt: 'Two guests riding a Waterdog jet ski near The Beach Park',
    summary: 'Choose a quick run or a full hour on the water.',
    details: 'Select from the brochure’s three ride durations and confirm whether you want a Waterdog operator with you.',
  },
  {
    slug: 'parasailing',
    name: 'Parasailing',
    category: 'powered-adventures',
    pace: 'Airborne',
    price: '₱2,000 per person',
    duration: '15 minutes',
    capacity: 'Minimum of 2 guests',
    image: parasailingCover,
    alt: 'Two guests parasailing above the Hadsan coast',
    summary: 'See the coast from above during a fifteen-minute flight.',
    details: 'Parasailing is offered for a minimum of two people, with the operating team confirming conditions before launch.',
  },
  {
    slug: 'paddle-kayak-tour',
    name: 'Paddle & Kayak Tour',
    category: 'paddle-activities',
    pace: 'Guided',
    price: '₱1,000–₱3,000',
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
    price: '₱300–₱800',
    duration: '15 minutes, 30 minutes, or 1 hour',
    capacity: 'Single or tandem options',
    options: ['Stand-up paddle', 'Red kayak (single)', 'Orange kayak (double tandem)'],
    image: adventuresKayak,
    alt: 'A parent and child kayaking near The Beach Park shore',
    summary: 'Paddle close to shore and take the day at your own rhythm.',
    details: 'Rent a paddleboard, single kayak, or double tandem kayak for one of the brochure’s listed durations.',
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
    price: '₱200',
    duration: 'Per day',
    capacity: 'Individual rental',
    image: snorkelingMaskCover,
    alt: 'A guest adjusting a snorkeling mask by the Hadsan shore',
    summary: 'Keep a snorkeling mask for the day and explore at your own pace.',
    details: 'The brochure lists snorkeling masks as a simple full-day equipment rental.',
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
  { question: 'How do I confirm current rates and availability?', answer: 'Use the booking link to view the current information maintained in Exely for property 507010.' },
  { question: 'Can I plan a day visit without booking a room?', answer: 'The Beach Park presents day experiences as well as stays. Current entrance rules, activity availability, and prices should be confirmed directly before visiting.' },
  { question: 'Where is The Beach Park?', answer: 'The Beach Park is in Hadsan, Lapu-Lapu City, Cebu.' },
]
