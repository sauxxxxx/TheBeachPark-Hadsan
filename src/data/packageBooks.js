import barkadaCover from '../../BEACH BARKADA 2500ml_15-20pax/BEACH BARKADA 2500ml_15-20pax_COVER.jpeg'
import familyFiesta from '../../BEACH BARKADA 2500ml_15-20pax/BB_(A)-FAMILY-FIESTA.jpeg'
import cebuFavorites from '../../BEACH BARKADA 2500ml_15-20pax/BB_(B)-CEBU-FAVORITES.jpeg'
import premiumFeast from '../../BEACH BARKADA 2500ml_15-20pax/BB_(C)-PREMIUM-BEACH-FEAST.jpeg'
import ultimateFeast from '../../BEACH BARKADA 2500ml_15-20pax/BB_(D)-ULTIMATE-BEACH-FEAST.jpeg'
import seafoodParty from '../../BEACH BARKADA 2500ml_15-20pax/BB_(E)-SEAFOOD-PARTY.jpeg'
import trayCover from '../../BEACH BARKADA TRAY 1600ml_4-8pax/(BBT)Beach-Barkada-Tray_4-8pax_COVER.jpeg'
import barkadaFeast from '../../BEACH BARKADA TRAY 1600ml_4-8pax/BBT_(A)-BEACH-BARKADA-FEAST.jpeg'
import tropangSaloSalo from '../../BEACH BARKADA TRAY 1600ml_4-8pax/BBT_(B)-BEACHSIDE-TROPANG-SALO-SALO.jpeg'
import cebuanoCatch from '../../BEACH BARKADA TRAY 1600ml_4-8pax/BBT_(C)-CEBUANO-CATCH-FEAST.jpeg'
import fiestaSeafood from '../../BEACH BARKADA TRAY 1600ml_4-8pax/BBT_(D)-FIESTA-SEAFOOD-PACKAGE.jpeg'
import barkadaSet from '../../BEACH BARKADA TRAY 1600ml_4-8pax/BBT_(E)-BEACH-BARKADA-SET.jpeg'
import backCover from '../assets/images/packages/package-back-cover-v1.webp'

export const packageBooks = [
  {
    id: 'beach-barkada-tray',
    title: 'Beach Barkada Tray',
    audience: 'For 4–8 guests',
    cover: trayCover,
    pages: [trayCover, barkadaFeast, tropangSaloSalo, cebuanoCatch, fiestaSeafood, barkadaSet, backCover],
  },
  {
    id: 'beach-barkada',
    title: 'Beach Barkada',
    audience: 'For 15–20 guests',
    cover: barkadaCover,
    pages: [barkadaCover, familyFiesta, cebuFavorites, premiumFeast, ultimateFeast, seafoodParty, backCover],
  },
]
