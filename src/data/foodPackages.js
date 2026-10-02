const sharedTrayInclusions = [
  '1 pack of ice cubes',
  'Disposable spoons and forks',
  'Paper plates',
  '2 complimentary entrance tickets',
]

const sharedBarkadaInclusions = [
  '1 pack of ice cubes',
  'Disposable spoons and forks',
  'Paper plates',
  '3 complimentary entrance tickets',
]

export const foodPackageFamilies = [
  {
    id: 'beach-barkada-tray',
    name: 'Beach Barkada Tray',
    serves: 'For 4–8 guests',
    traySize: '1,600 ml trays',
    intro: 'Easy sharing sets for a small family or barkada beach day.',
    inclusions: sharedTrayInclusions,
    packages: [
      {
        name: 'Beach Barkada Feast',
        serves: '4–5 guests',
        dishes: ['Grilled pork belly', 'Bam-E guisado', 'Rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Beachside Tropang Salo-Salo',
        serves: '6–8 guests',
        dishes: ['Grilled pork belly', 'Fried chicken', 'Canton guisado', 'Rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Cebuano Catch Feast',
        serves: '6–8 guests',
        dishes: ['Grilled pork belly', 'Fried chicken', 'Tuna belly', 'Guso', 'Rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Fiesta Seafood Package',
        serves: '6–8 guests',
        dishes: ['Grilled tuna belly', 'Calamares', 'Buttered shrimp', 'Guso salad', 'Rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Beach Barkada Set',
        serves: '6–8 guests',
        dishes: ['Chicken afritada', 'Pork sisig', 'Chopsuey', 'Bam-I guisado', 'Rice', 'Fermented fish paste (ginamos)'],
      },
    ],
  },
  {
    id: 'beach-barkada',
    name: 'Beach Barkada',
    serves: 'For 15–20 guests',
    traySize: '2,500 ml trays',
    intro: 'Larger feast sets made for reunions, celebrations, and the whole crew.',
    inclusions: sharedBarkadaInclusions,
    packages: [
      {
        name: 'Family Fiesta',
        serves: '15–20 guests',
        dishes: ['Bucket chicken', 'Buttered shrimp', 'Chopsuey', 'Bam-I guisado', '2 trays of rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Cebu Favorites',
        serves: '15–20 guests',
        dishes: ['Humba', 'Pork sisig', 'Shrimp sinigang', 'Guso salad', '2 trays of rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Premium Beach Feast',
        serves: '15–20 guests',
        dishes: ['Grilled pork belly', 'Bucket chicken', 'Calamares', 'Bam-E guisado', 'Guso salad', '2 trays of rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Ultimate Beach Feast',
        serves: '15–20 guests',
        dishes: ['Grilled pork belly', 'Grilled chicken', 'Tuna belly', 'Buttered shrimp', 'Crispy pork sisig', '2 trays of rice', 'Fermented fish paste (ginamos)'],
      },
      {
        name: 'Seafood Party',
        serves: '15–20 guests',
        dishes: ['Grilled pork belly', 'Grilled chicken', 'Tuna belly', 'Buttered shrimp', 'Crispy pork sisig', '2 trays of rice', 'Fermented fish paste (ginamos)'],
      },
    ],
  },
]
