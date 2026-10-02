<script setup>
import beachDay from '../assets/images/real/beach-day.webp'
import beachAerial from '../assets/images/real/beach-aerial.webp'
import poolside from '../assets/images/real/poolside.webp'
import roomDouble from '../assets/images/real/room-double.webp'
import roomFamily from '../assets/images/real/room-family.webp'
import roomBarkada from '../assets/images/real/room-barkada.webp'
import bananaBoat from '../assets/images/waterdog/banana-boat.jpg'
import beachsideDining from '../assets/images/gallery/beachside-dining.jpg'
import { property, waterdogContact } from '../data/siteContent'
import {
  amenityAddOns, beachAmenities, beachEntrance, dayUseRooms, foodPackage,
  formatPeso, overnightRooms, poolEntrance, rateSheetDate, waterSports,
} from '../data/ratesContent'

const sections = [
  { id: 'entrance', label: 'Entrance' },
  { id: 'amenities', label: 'Beach amenities' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'watersports', label: 'Water sports' },
  { id: 'food', label: 'Food packages' },
]
</script>

<template>
  <div class="rates-page">
    <header class="rates-hero">
      <img :src="beachDay" alt="Guests enjoying the beach at The Beach Park" width="1600" height="1000" />
      <div class="rates-hero__shade" aria-hidden="true"></div>
      <div class="page-shell rates-hero__content">
        <h1>Make room for the day.</h1>
        <p>Beach time, rooms, and adventures—priced for the plans you make together.</p>
      </div>
    </header>

    <div class="rates-intro page-shell">
      <p>Rates supplied by The Beach Park team in {{ rateSheetDate }}. Prices are in Philippine pesos. Photos show the property; specific setups may vary. Confirm availability and the final quote before your visit.</p>
      <nav aria-label="Rates sections"><a v-for="section in sections" :key="section.id" :href="`#${section.id}`">{{ section.label }}</a></nav>
    </div>

    <section id="entrance" class="rates-section page-shell" aria-labelledby="entrance-title">
      <header class="rates-section__heading"><h2 id="entrance-title">Come for the water.</h2><p>Entrance rates</p></header>
      <div class="rates-entrance">
        <article class="rates-entrance__item">
          <figure class="rates-entrance__visual"><img :src="beachDay" alt="Guests swimming at The Beach Park" loading="lazy" width="1600" height="1000" /><figcaption>Beach day <span>01 / 02</span></figcaption></figure>
          <div class="rates-entrance__details">
          <h3>Beach entrance</h3>
          <div class="rates-price-feature"><span>Regular entrance</span><strong>{{ formatPeso(beachEntrance.regular) }}</strong><small>per person</small></div>
          <p class="rates-discount"><span>20% off</span><strong>{{ formatPeso(beachEntrance.discounted) }}</strong> per person for eligible guests</p>
          <p>The discounted rate is available to {{ beachEntrance.discountGroups.join(', ') }}.</p>
          <h4>Children by height</h4>
          <dl class="rates-facts"><div v-for="child in beachEntrance.children" :key="child.height"><dt>{{ child.height }}</dt><dd>{{ child.price }}</dd></div></dl>
          <p class="rates-note">The supplied brackets overlap at exactly 4.5 ft; please confirm that boundary with the team.</p>
          </div>
        </article>
        <article class="rates-entrance__item">
          <figure class="rates-entrance__visual"><img :src="poolside" alt="Pool area at The Beach Park" loading="lazy" width="1600" height="1000" /><figcaption>Pool time <span>02 / 02</span></figcaption></figure>
          <div class="rates-entrance__details">
          <h3>Pool entrance</h3>
          <div class="rates-price-feature"><span>One rate for everyone</span><strong>{{ formatPeso(poolEntrance.regular) }}</strong><small>per person · children & adults</small></div>
          <dl class="rates-facts"><div v-for="slot in poolEntrance.hours" :key="slot.days"><dt>{{ slot.days }}</dt><dd>{{ slot.hours }}</dd></div></dl>
          </div>
        </article>
      </div>
    </section>

    <section id="amenities" class="rates-section rates-section--paper" aria-labelledby="amenities-title">
      <div class="page-shell">
        <header class="rates-section__heading"><h2 id="amenities-title">Settle in by the shore.</h2><p>Beach amenities · day-use only</p></header>
        <div class="rates-amenities-layout">
          <figure class="rates-amenities__visual">
            <img :src="beachAerial" alt="Beachside tents and gathering areas at The Beach Park" loading="lazy" width="2560" height="1600" />
            <figcaption>Find your place by the water.<small>Day-use setups for the whole group</small></figcaption>
          </figure>
          <div>
        <div class="rates-row-list">
          <article v-for="amenity in beachAmenities" :key="amenity.name" class="rates-row">
            <h3>{{ amenity.name }}</h3>
            <div class="rates-row__options"><div v-for="option in amenity.options" :key="`${option.label}-${option.price}`">
              <strong>{{ formatPeso(option.price) }}</strong><span>{{ option.capacity }} guests<template v-if="option.label"> · {{ option.label }}</template></span>
              <small v-if="option.includes">Includes {{ option.includes }}</small>
            </div></div>
          </article>
        </div>
        <p class="rates-note">Optional add-ons: <span v-for="(addOn, index) in amenityAddOns" :key="addOn.name">{{ addOn.name }} {{ formatPeso(addOn.price) }}<template v-if="index < amenityAddOns.length - 1"> · </template></span>.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="rooms" class="rates-section page-shell" aria-labelledby="rooms-title">
      <header class="rates-section__heading"><h2 id="rooms-title">Stay a little longer.</h2><p>Room rates</p></header>
      <p class="rates-section__intro">Overnight weekday rates apply Monday–Thursday; weekend rates apply Friday–Sunday. The supplied weekend plan includes breakfast. Entrance is free for guests availing rooms.</p>
      <div class="rates-room-gallery" aria-label="Room photographs at The Beach Park">
        <img :src="roomDouble" alt="Double-bed room at The Beach Park" loading="lazy" width="1600" height="1000" />
        <img :src="roomFamily" alt="Family room at The Beach Park" loading="lazy" width="1600" height="1000" />
        <img :src="roomBarkada" alt="Bunk-bed room at The Beach Park" loading="lazy" width="1600" height="1000" />
      </div>
      <div class="rates-table-wrap"><table class="rates-table">
        <caption>Overnight room rates</caption>
        <thead><tr><th scope="col">Room · guests</th><th scope="col">Mon–Thu<br />Room only</th><th scope="col">Mon–Thu<br />With breakfast</th><th scope="col">Fri–Sun<br />With breakfast</th></tr></thead>
        <tbody><tr v-for="room in overnightRooms" :key="room.slug">
          <th scope="row"><RouterLink :to="`/stay/room-details/${room.slug}/`">{{ room.name }}</RouterLink><small>For {{ room.capacity }} guests</small></th>
          <td data-label="Mon–Thu · Room only">{{ formatPeso(room.weekdayRoom) }}</td>
          <td data-label="Mon–Thu · With breakfast">{{ formatPeso(room.weekdayBreakfast) }}</td>
          <td data-label="Fri–Sun · With breakfast">{{ formatPeso(room.weekendBreakfast) }}</td>
        </tr></tbody>
      </table></div>

      <div class="rates-subsection"><h3>Rooms for the day.</h3><p>Monday–Thursday room-only day use lasts 10 hours.</p></div>
      <div class="rates-row-list">
        <article v-for="room in dayUseRooms" :key="room.slug" class="rates-row rates-row--dayroom">
          <div><h4>{{ room.name }}</h4><p>For {{ room.capacity }} guests · {{ room.beds }}</p></div><strong>{{ formatPeso(room.price) }}</strong>
        </article>
      </div>
      <p class="rates-note">Extra person: {{ formatPeso(850) }} per person, including breakfast and a single mattress bed.</p>
    </section>

    <section id="watersports" class="rates-section rates-section--paper" aria-labelledby="watersports-title">
      <div class="page-shell">
        <header class="rates-section__heading"><h2 id="watersports-title">Take to the water.</h2><p>Water sports & adventures</p></header>
        <figure class="rates-action-visual"><img :src="bananaBoat" alt="Guests on a Waterdog banana boat at The Beach Park" loading="lazy" width="1600" height="1000" /><figcaption>Make a splash.<small>Waterdog Adventures</small></figcaption></figure>
        <div class="rates-row-list rates-row-list--sports"><article v-for="sport in waterSports" :key="sport.name" class="rates-row">
          <h3>{{ sport.name }}</h3><div><strong>{{ sport.rates }}</strong><small v-if="sport.note">{{ sport.note }}</small></div>
        </article></div>
        <p class="rates-note">Activities depend on weather, safety conditions, and availability. <a :href="waterdogContact.phoneHref">Confirm with Waterdog</a> before your visit.</p>
      </div>
    </section>

    <section id="food" class="rates-section page-shell" aria-labelledby="food-title">
      <header class="rates-section__heading"><h2 id="food-title">Gather around the table.</h2><p>Food package</p></header>
      <div class="rates-food-layout">
        <figure class="rates-food__visual"><img :src="beachsideDining" alt="Guests gathering at a beachside table at The Beach Park" loading="lazy" width="1600" height="1000" /><figcaption>Good company by the shore.</figcaption></figure>
        <div>
      <div class="rates-food">
        <div><h3>Buffet package</h3><dl class="rates-facts"><div v-for="tier in foodPackage.tiers" :key="tier.minimum"><dt>{{ tier.minimum }} guests and above</dt><dd>{{ formatPeso(tier.price) }}</dd></div></dl></div>
        <div><h3>Included</h3><ul><li v-for="item in foodPackage.inclusions" :key="item">{{ item }}</li></ul></div>
      </div>
      <p class="rates-note">Free entrance is included depending on the number of guests reserved. The venue fee is separate and depends on the number of guests. Ask the team for a complete quote.</p>
        </div>
      </div>
    </section>

    <footer class="rates-end"><div class="page-shell"><h2>Ready to plan your visit?</h2><p>For room dates, day-use arrangements, or group packages, confirm the details with the property team.</p><a class="button button--light" :href="property.phoneHref">Call The Beach Park</a></div></footer>
  </div>
</template>
