import adventureJetskiUhd from '../assets/images/generated/home-adventure-jetski-uhd-v3.webp'
import adventureKayakUhd from '../assets/images/generated/home-adventure-kayak-uhd-v3.webp'
import beachAerial from '../assets/images/real/beach-aerial.webp'
import beachDay from '../assets/images/real/beach-day.webp'
import beansCafeDetail from '../assets/images/generated/beans-cafe-detail-v2.webp'
import beansCafeHero from '../assets/images/generated/beans-cafe-hero-v2.webp'
import beansLatte from '../assets/images/generated/beans-latte.webp'
import kayakFamily from '../assets/images/real/kayak-family.webp'
import roomBarkada from '../assets/images/real/room-barkada.webp'
import roomDouble from '../assets/images/real/room-double.webp'
import roomFamily from '../assets/images/real/room-family.webp'
import speedboatBeach from '../assets/images/real/speedboat-beach.webp'
import bananaBoat from '../assets/images/waterdog/banana-boat.jpg'
import speedboatRide from '../assets/images/waterdog/speedboat-ride.jpg'
import speedboatRideGuest from '../assets/images/waterdog/speedboat-ride-guest.jpg'

export const destinationTiles = [
  { key: 'stay', label: 'Stay at The Beach Park', description: 'Rooms for two or the whole barkada.', action: 'See rooms', to: '/stay/', image: null, alt: 'Placeholder for forthcoming Stay photography' },
  { key: 'beach', label: 'Beach & Pool', description: 'Swim, float, and slow down by the water.', action: 'Explore', to: '/experiences/', image: beachAerial, alt: 'Guests enjoying the clear water along The Beach Park shore', position: 'center 58%' },
  { key: 'waterdog', label: 'Waterdog Adventures', description: 'Speed, spray, and open water.', action: 'Explore', to: '/adventures/', image: speedboatRide, alt: 'Family aboard a Waterdog speedboat on open water', position: 'center 42%' },
  { key: 'pickleball', label: 'Pickleball', description: 'A friendly game between swims.', action: 'Ask about play', to: '/explore/contact/', image: null, alt: 'Placeholder for forthcoming Pickleball photography' },
  { key: 'eat', label: 'Eat & Drink', description: 'Coffee and easy meals by the water.', action: 'Choose a table', to: '/eat/', image: beansLatte, alt: 'Coffee served beside the water at The Beach Park', position: '60% center' },
]

export const dayStops = [
  { id: 'coffee', time: 'Start', label: 'Coffee at Beans & Paddles' },
  { id: 'swim', time: 'Cool off', label: 'Beach & Pool' },
  { id: 'lunch', time: 'Refuel', label: "Lunch at Sharky's" },
  { id: 'adventure', time: 'Make waves', label: 'Waterdog Adventures' },
  { id: 'sunset', time: 'Slow down', label: 'Sunset' },
  { id: 'souvenir', time: 'One last stop', label: 'Souvenir Shop' },
]

export const stayImages = [
  { src: roomFamily, alt: 'Family room with two wooden beds at The Beach Park' },
  { src: roomBarkada, alt: 'Barkada bunk room at The Beach Park' },
  { src: roomDouble, alt: 'Double room with blue walls at The Beach Park' },
]

export const diningImages = {
  beans: { src: beansCafeHero, alt: 'Exterior of Beans & Paddles Café at The Beach Park' },
  detail: { src: beansCafeDetail, alt: 'The turquoise façade and wooden windows of Beans & Paddles Café' },
  coffee: { src: beansLatte, alt: 'A cup of coffee beside the water' },
}

export const adventureActivities = [
  { id: 'jetski', label: 'Jet ski', image: adventureJetskiUhd, alt: 'Two guests riding the Waterdog jet ski', description: 'Fast water. Fresh spray.' },
  { id: 'kayak', label: 'Kayak', image: adventureKayakUhd, alt: 'An adult and child paddling the Waterdog kayak', description: 'Paddle close to shore.' },
  { id: 'banana', label: 'Banana boat', image: bananaBoat, alt: 'Guests riding the Waterdog banana boat', description: 'One ride for the whole group.' },
  { id: 'speedboat', label: 'Speedboat ride', image: speedboatRideGuest, alt: 'Guest riding a Waterdog speedboat on open water', description: 'Ride across open water.' },
]

export const memoryImages = [
  { key: 'beach', src: beachDay, alt: 'Children playing on the beach at The Beach Park' },
  { key: 'kayak', src: kayakFamily, alt: 'A parent and child kayaking in the clear water off The Beach Park' },
  { key: 'boat', src: speedboatBeach, alt: 'A Waterdog speedboat floating by The Beach Park shore' },
  { key: 'banana', src: bananaBoat, alt: 'Guests riding the Waterdog banana boat' },
]
