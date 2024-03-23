import axios from 'axios'

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2U5NzYzYjU5YzZlYjFhYjdkNjhkZjhhNDUyYjFkZCIsInN1YiI6IjY1ZmVhN2IzNjJmMzM1MDE3ZDUxNmJiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jcs1n0BoMssssICEjkKIeD4Ly7-Qk8wxmwhHpRNdBWc",
  },
};

const trendReq = async () => {
    const res = await axios.get('trending/movie/week', options)

    return res.data.results
}

const queryReq = async (query) => {
    const res = await axios.get(
      `search/movie?include_adult=true&page=1&query=${query}`,
      options
    );

    return res.data.results
}

const movieDetailsReq = async (movieId) => {
    const res = await axios.get(`movie/${movieId}`, options)

    return res.data
}

const movieCastReq = async (movieId) => {
    const res = await axios.get(`movie/${movieId}/credits`, options)

    return res.data.cast
}

const movieReviewsReq = async (movieId) => {
    const res = await axios.get(`movie/${movieId}/reviews`, options)

    return res.data.results
}

export { 
    trendReq,
    queryReq,
    movieDetailsReq,
    movieCastReq,
    movieReviewsReq
 }