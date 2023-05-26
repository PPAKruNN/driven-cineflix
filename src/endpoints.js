const ENDPOINTS = {
    movies: "https://mock-api.driven.com.br/api/v8/cineflex/movies",
    sessions: (id) => `https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`,
    seats: (id) => `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`,
    reservate: "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
}

export default ENDPOINTS;