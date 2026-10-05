const PLACE_QUERY = 'The Beach Park-Hadsan, Hadsan, Agus, Lapu-Lapu City, Cebu, Philippines'
const PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places:searchText'
const RESPONSE_FIELDS = [
  'places.displayName',
  'places.rating',
  'places.userRatingCount',
  'places.reviews',
  'places.googleMapsUri',
].join(',')

const json = (body, status = 200, headers = {}) => Response.json(body, {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...headers,
  },
})

const normalizeReview = (review) => ({
  author: review.authorAttribution?.displayName || 'Google user',
  authorUrl: review.authorAttribution?.uri || '',
  authorPhotoUrl: review.authorAttribution?.photoUri || '',
  rating: Number(review.rating) || 0,
  published: review.relativePublishTimeDescription || '',
  text: review.text?.text || review.originalText?.text || '',
  translated: Boolean(
    review.text?.languageCode
    && review.originalText?.languageCode
    && review.text.languageCode !== review.originalText.languageCode
  ),
  googleMapsUrl: review.googleMapsUri || '',
})

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return json({ error: 'Google reviews are not configured.' }, 503, {
      'Cache-Control': 'no-store',
    })
  }

  try {
    const googleResponse = await fetch(PLACES_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': RESPONSE_FIELDS,
      },
      body: JSON.stringify({
        textQuery: PLACE_QUERY,
        languageCode: 'en',
        regionCode: 'PH',
        pageSize: 1,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!googleResponse.ok) {
      console.error(`Google Places request failed with status ${googleResponse.status}.`)
      return json({ error: 'Google reviews are temporarily unavailable.' }, 502, {
        'Cache-Control': 'no-store',
      })
    }

    const payload = await googleResponse.json()
    const place = payload.places?.[0]

    if (!place) {
      return json({ error: 'The Google business listing could not be found.' }, 404, {
        'Cache-Control': 'no-store',
      })
    }

    return json({
      name: place.displayName?.text || 'The Beach Park-Hadsan',
      rating: Number(place.rating) || 0,
      reviewCount: Number(place.userRatingCount) || 0,
      googleMapsUrl: place.googleMapsUri || '',
      reviews: (place.reviews || [])
        .map(normalizeReview)
        .filter((review) => review.text)
        .slice(0, 5),
    }, 200, {
      'Cache-Control': 'private, no-store',
    })
  } catch (error) {
    console.error('Google Places request failed.', error instanceof Error ? error.message : error)
    return json({ error: 'Google reviews are temporarily unavailable.' }, 502, {
      'Cache-Control': 'no-store',
    })
  }
}
