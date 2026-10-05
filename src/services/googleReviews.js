export async function getGoogleReviews({ signal } = {}) {
  const response = await fetch('/api/google-reviews', {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Google reviews request failed with status ${response.status}.`)
  }

  return response.json()
}
