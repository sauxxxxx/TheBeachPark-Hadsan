import roomImage from '../assets/images/real/rooms/beach-house-room-1.webp'
import beachImage from '../assets/images/real/beach-aerial.webp'
import { specialOffers } from './siteContent'

const advanceOffer = specialOffers.find((offer) => offer.slug === 'book-now-stay-later')

export const bookingPromotions = [
  {
    id: 'advance-booking',
    eyebrow: 'A little planning, a little saving',
    title: 'Book now, stay later.',
    description: advanceOffer.detail,
    image: roomImage,
    imageAlt: 'Bright Beach House room with white bedding and warm lighting',
    imagePosition: '48% center',
    highlight: '10% off',
    label: 'Book this offer',
    to: { path: '/booking/', query: { 'special-offer': '10167951' } },
  },
  {
    id: 'website-offers',
    eyebrow: 'Your next beach getaway',
    title: 'Your special deal awaits.',
    description: 'Explore the offers available when you book directly with The Beach Park Hadsan.',
    image: beachImage,
    imageAlt: 'Guests swimming in turquoise water off The Beach Park beach',
    imagePosition: '52% center',
    highlight: 'Book direct',
    label: 'Check special offers',
    to: '/booking/',
  },
]
