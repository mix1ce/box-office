const API_BASE_URL = 'https://api.tvmaze.com'

export const apiGet = async queryString => {
  return await fetch(`${API_BASE_URL}${queryString}`).then(response =>
    response.json()
  )
}
