import bananaBoat from '../assets/images/real/banana-boat-group.webp'
import beachAerial from '../assets/images/real/beach-aerial.webp'
import beachDay from '../assets/images/real/beach-day.webp'
import beansCafe from '../assets/images/real/beans-cafe.jpg'
import jetski from '../assets/images/real/jetski.webp'
import kayakFamily from '../assets/images/real/kayak-family.webp'
import poolside from '../assets/images/real/poolside.webp'
import speedboat from '../assets/images/real/speedboat-beach.webp'

export const experiencesHero = {
  image: beachAerial,
  alt: 'Aerial view of guests enjoying the clear water at The Beach Park Hadsan',
}

export const experienceFilters = [
  { value: 'all', label: 'All experiences' },
  { value: 'water', label: 'Water' },
  { value: 'sport', label: 'Sports' },
  { value: 'food', label: 'Food' },
  { value: 'slow', label: 'Slow moments' },
  { value: 'together', label: 'Together' },
]

export const experiences = [
  {
    id: 'waterdog', title: 'Waterdog Adventures', category: 'water',
    copy: 'The starting point for faster rides, quiet paddles, and time beyond the shoreline.',
    image: speedboat, alt: 'Waterdog speedboat floating in clear water beside The Beach Park',
    to: '/adventures/', cta: 'Meet Waterdog', layout: 'feature',
  },
  {
    id: 'jet-ski', title: 'Jet Ski', category: 'water',
    copy: 'Open water, sea spray, and a quicker way to make waves.',
    image: jetski, alt: 'Two guests riding a jet ski on open water',
    to: '/adventures/details/jet-ski/', cta: 'See the ride', layout: 'tall', position: '63% center',
  },
  {
    id: 'banana-boat', title: 'Banana Boat', category: 'water',
    copy: 'Bring the group and hold on for one bright, loud ride together.',
    image: bananaBoat, alt: 'A group smiling together on a banana boat ride',
    to: '/adventures/details/banana-boat/', cta: 'Plan a group ride', layout: 'standard',
  },
  {
    id: 'kayak-water-bike', title: 'Kayak & Water Bike', category: 'water',
    copy: 'Stay close to shore, find your balance, and take in the coast without hurrying.',
    image: kayakFamily, alt: 'A parent and child kayaking close to The Beach Park shore',
    to: '/adventures/details/kayak/', cta: 'Choose a paddle', layout: 'wide',
  },
  {
    id: 'pickleball', title: 'Pickleball', category: 'sport',
    copy: 'Trade the water for a friendly game between swims and slow afternoons.',
    image: poolside, alt: 'Outdoor recreation court beside the pool at The Beach Park',
    to: '/explore/contact/', cta: 'Ask about play', layout: 'tall', position: '43% center',
  },
  {
    id: 'beach-sea', title: 'Beach & Sea', category: 'slow',
    copy: 'Swim, float, sit by the shore, or let the day decide what comes next.',
    image: beachDay, alt: 'Children playing on the shore at The Beach Park Hadsan',
    to: '/explore/gallery/', cta: 'See the shoreline', layout: 'feature', position: 'center 58%',
  },
  {
    id: 'poolside', title: 'Poolside', category: 'slow',
    copy: 'A relaxed base for cooling off, regrouping, and stretching out the afternoon.',
    image: poolside, alt: 'Pool and shaded grounds at The Beach Park Hadsan',
    to: '/stay/', cta: 'Stay near the pool', layout: 'standard', position: '75% center',
  },
  {
    id: 'beans-paddles', title: 'Beans & Paddles Café', category: 'food',
    copy: 'Start slowly, cool down after the water, or stay for one more cup.',
    image: beansCafe, alt: 'Teal and timber exterior of Beans & Paddles Café at The Beach Park',
    to: '/eat/beans-and-paddles/', cta: 'Visit the café', layout: 'standard',
  },
  {
    id: 'sharkys', title: 'Sharky’s Café', category: 'food',
    copy: 'A casual table in the middle of the day. Current menu and hours are confirmed directly.',
    to: '/eat/sharkys-cafe/', cta: 'Explore Sharky’s', layout: 'standard', theme: 'deep',
  },
  {
    id: 'family-barkada', title: 'Family & Barkada Days', category: 'together',
    copy: 'Beach time, shared food, water rides, and rooms that keep the group close.',
    image: beachAerial, alt: 'Families and groups swimming together at The Beach Park Hadsan',
    to: '/stay/', cta: 'Make a day of it', layout: 'wide', position: 'center 30%',
  },
  {
    id: 'sunset', title: 'Sunset by the Sea', category: 'slow',
    copy: 'Leave enough room in the plan to slow down and stay close to the water.',
    to: '/explore/contact/', cta: 'Plan your visit', layout: 'standard', theme: 'sunset',
  },
]
