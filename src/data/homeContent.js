import adventureJetskiUhd from '../assets/images/generated/home-adventure-jetski-uhd-v3.webp'
import adventureKayakUhd from '../assets/images/generated/home-adventure-kayak-uhd-v3.webp'
import pickleballCourt from '../assets/images/generated/home-pickleball-court-v2.webp'
import beachAerial from '../assets/images/real/beach-aerial.webp'
import beachDay from '../assets/images/real/beach-day.webp'
import kayakFamily from '../assets/images/real/kayak-family.webp'
import roomBarkada from '../assets/images/real/room-barkada.webp'
import roomDouble from '../assets/images/real/room-double.webp'
import roomFamily from '../assets/images/real/room-family.webp'
import speedboatBeach from '../assets/images/real/speedboat-beach.webp'
import bananaBoat from '../assets/images/waterdog/banana-boat.jpg'
import speedboatRide from '../assets/images/waterdog/speedboat-ride.jpg'
import speedboatRideGuest from '../assets/images/waterdog/speedboat-ride-guest.jpg'

export const destinationTiles = [
  { key: 'stay', label: 'Stay at The Beach Park', description: 'Rooms for two or the whole barkada.', action: 'See rooms', to: '/stay/', image: roomFamily, alt: 'Guest room with two wooden beds at The Beach Park' },
  { key: 'beach', label: 'Beach & Pool', description: 'Swim, float, and slow down by the water.', action: 'Explore', to: '/experiences/', image: beachAerial, alt: 'Guests enjoying the clear water along The Beach Park shore', position: 'center 58%' },
  { key: 'waterdog', label: 'Waterdog Adventures', description: 'Speed, spray, and open water.', action: 'Explore', to: '/adventures/', image: speedboatRide, alt: 'Family aboard a Waterdog speedboat on open water', position: 'center 42%' },
  { key: 'pickleball', label: 'Pickleball', description: 'A friendly game between swims.', action: 'Ask about play', to: '/explore/contact/', image: pickleballCourt, alt: 'Blue pickleball court framed by trees at The Beach Park' },
]

export const dayStops = [
  { id: 'beach', time: 'Start', label: 'Settle in by the shore' },
  { id: 'swim', time: 'Cool off', label: 'Take a swim' },
  { id: 'adventure', time: 'Make waves', label: 'Waterdog Adventures' },
  { id: 'sunset', time: 'Slow down', label: 'Sunset' },
  { id: 'souvenir', time: 'One last stop', label: 'Souvenir Shop' },
]

export const stayImages = [
  { src: roomFamily, alt: 'Family room with two wooden beds at The Beach Park' },
  { src: roomBarkada, alt: 'Barkada bunk room at The Beach Park' },
  { src: roomDouble, alt: 'Double room with blue walls at The Beach Park' },
]

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
