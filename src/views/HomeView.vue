<script setup>
import AdventureFeature from '../components/home/AdventureFeature.vue'
import DayTimeline from '../components/home/DayTimeline.vue'
import DestinationGrid from '../components/home/DestinationGrid.vue'
import DiningFeatures from '../components/home/DiningFeatures.vue'
import HomeEntrance from '../components/home/HomeEntrance.vue'
import HomepageHero from '../components/home/HomepageHero.vue'
import MemoriesCollage from '../components/home/MemoriesCollage.vue'
import ScrollStory from '../components/home/ScrollStory.vue'
import StayFeature from '../components/home/StayFeature.vue'
</script>

<template>
  <div class="home-page">
    <HomeEntrance />
    <HomepageHero />
    <ScrollStory title="Life, by Water." :reveal-words="false" />
    <DestinationGrid />
    <DayTimeline />
    <StayFeature />
    <DiningFeatures />
    <AdventureFeature />
    <MemoriesCollage />
  </div>
</template>
