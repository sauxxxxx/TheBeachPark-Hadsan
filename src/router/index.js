import { scrollToTarget } from '../services/smoothScroll'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { applySeo } from '../services/seo'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'The Beach Park Hadsan | Stay, Eat & Play in Cebu', description: 'A cheerful beach destination in Hadsan, Lapu-Lapu City for rooms, cafés, water adventures, and easy days together.' },
    },
    { path: '/stay/', name: 'stay', component: () => import('../views/StayView.vue'), meta: { title: 'Rooms & Stays | The Beach Park Hadsan', description: 'Explore welcoming rooms for couples, families, and barkadas at The Beach Park Hadsan.' } },
    { path: '/stay/room-details/:slug/', name: 'room-details', component: () => import('../views/RoomDetailView.vue'), meta: { title: 'Room Details | The Beach Park Hadsan', description: 'See room features and continue to current Exely availability at The Beach Park Hadsan.' } },
    { path: '/eat/', name: 'eat', component: () => import('../views/EatView.vue'), meta: { title: 'Eat & Drink | The Beach Park Hadsan', description: 'Meet Beans & Paddles Café and Sharky’s Café at The Beach Park Hadsan.' } },
    { path: '/eat/beans-and-paddles/', name: 'beans-and-paddles', component: () => import('../views/VenueView.vue'), meta: { venue: 'beans', title: 'Beans & Paddles Café | The Beach Park', description: 'Coffee and a relaxed café stop at The Beach Park Hadsan.' } },
    { path: '/eat/sharkys-cafe/', name: 'sharkys-cafe', component: () => import('../views/VenueView.vue'), meta: { venue: 'sharkys', title: 'Sharky’s Café | The Beach Park', description: 'Plan a casual dining stop during your day at The Beach Park Hadsan.' } },
    { path: '/adventures/', name: 'adventures', component: () => import('../views/AdventuresView.vue'), meta: { title: 'Waterdog Adventures | The Beach Park', description: 'Explore Waterdog rides, tours, paddle activities, and equipment rentals at The Beach Park Hadsan.' } },
    { path: '/adventures/details/:slug/', name: 'adventure-details', component: () => import('../views/AdventureDetailView.vue'), meta: { title: 'Adventure Details | Waterdog Adventures', description: 'See brochure prices, durations, capacities, and visit details for Waterdog activities.' } },
    { path: '/experiences/', name: 'experiences', component: () => import('../views/ExperiencesView.vue'), meta: { title: 'Experiences | The Beach Park Hadsan', description: 'Explore Waterdog adventures, cafés, pickleball, poolside time, family days, and the shoreline at The Beach Park Hadsan.' } },
    { path: '/offers/', name: 'offers', component: () => import('../views/OffersView.vue'), meta: { title: 'Offers & Packages | The Beach Park Hadsan', description: 'Check current room offers and Beach Park trip ideas without stale hard-coded prices.' } },
    { path: '/explore/souvenir-shop/', name: 'souvenir-shop', component: () => import('../views/SouvenirView.vue'), meta: { title: 'Souvenir Shop | The Beach Park Hadsan', description: 'Plan one last on-site stop before your Beach Park day ends.' } },
    { path: '/explore/gallery/', name: 'gallery', component: () => import('../views/GalleryView.vue'), meta: { title: 'Gallery | The Beach Park Hadsan', description: 'Explore authentic photographs of rooms, water activities, cafés, and the shoreline.' } },
    { path: '/explore/about/', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: 'About | The Beach Park Hadsan', description: 'Meet the warm, playful, and connected personality of The Beach Park Hadsan.' } },
    { path: '/explore/contact/', name: 'contact', component: () => import('../views/ContactView.vue'), meta: { title: 'Contact & Directions | The Beach Park', description: 'Contact The Beach Park Hadsan and get directions to Hadsan, Lapu-Lapu City, Cebu.' } },
    {
      path: '/booking/',
      name: 'booking',
      component: () => import('../views/BookingView.vue'),
      meta: { title: 'Book Your Stay | The Beach Park Hadsan', description: 'Continue to the official Exely booking experience for current availability, rates, and terms.' },
    },
    { path: '/privacy/', name: 'privacy', component: () => import('../views/LegalView.vue'), meta: { legal: 'privacy', title: 'Privacy Policy | The Beach Park Hadsan', description: 'Website and booking privacy information for The Beach Park Hadsan.' } },
    { path: '/terms/', name: 'terms', component: () => import('../views/LegalView.vue'), meta: { legal: 'terms', title: 'Terms & Conditions | The Beach Park Hadsan', description: 'Website and booking terms information for The Beach Park Hadsan.' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: 'Page Not Found | The Beach Park Hadsan', description: 'Return to The Beach Park Hadsan website.' } },
  ],
  scrollBehavior(to) {
    // Hand navigation to Lenis when it is running; two scrollers fighting over
    // the same position reads as a stutter. Falls back to native behaviour.
    if (to.hash) {
      // The landing offset comes from scroll-margin-top in interactions.css,
      // which both Lenis and native anchor scrolling respect.
      if (scrollToTarget(to.hash)) return false
      return { el: to.hash, behavior: 'smooth' }
    }
    if (scrollToTarget(0, { immediate: true })) return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  applySeo(to)
})

export default router
