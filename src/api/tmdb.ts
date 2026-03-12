import axios from 'axios';
import type {
  Movie,
  MovieDetail,
  Credits,
  Video,
  PaginatedResponse,
  GenreListResponse,
} from '../types/tmdb';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Trending
export const getTrending = (timeWindow: 'day' | 'week' = 'week') =>
  tmdbApi.get<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`).then(r => r.data);

// Popular
export const getPopular = (page = 1) =>
  tmdbApi.get<PaginatedResponse<Movie>>('/movie/popular', { params: { page } }).then(r => r.data);

// Now Playing
export const getNowPlaying = (page = 1) =>
  tmdbApi.get<PaginatedResponse<Movie>>('/movie/now_playing', { params: { page } }).then(r => r.data);

// Top Rated
export const getTopRated = (page = 1) =>
  tmdbApi.get<PaginatedResponse<Movie>>('/movie/top_rated', { params: { page } }).then(r => r.data);

// Movie Detail
export const getMovieDetails = (id: number) =>
  tmdbApi.get<MovieDetail>(`/movie/${id}`).then(r => r.data);

// Movie Credits
export const getMovieCredits = (id: number) =>
  tmdbApi.get<Credits>(`/movie/${id}/credits`).then(r => r.data);

// Movie Videos
export const getMovieVideos = (id: number) =>
  tmdbApi.get<{ id: number; results: Video[] }>(`/movie/${id}/videos`).then(r => r.data);

// Similar Movies
export const getSimilarMovies = (id: number) =>
  tmdbApi.get<PaginatedResponse<Movie>>(`/movie/${id}/similar`).then(r => r.data);

// Search
export const searchMovies = (query: string, page = 1) =>
  tmdbApi.get<PaginatedResponse<Movie>>('/search/movie', { params: { query, page } }).then(r => r.data);

// Genres
export const getGenres = () =>
  tmdbApi.get<GenreListResponse>('/genre/movie/list').then(r => r.data);

// Movies by Genre
export const getMoviesByGenre = (genreId: number, page = 1) =>
  tmdbApi
    .get<PaginatedResponse<Movie>>('/discover/movie', {
      params: { with_genres: genreId, page, sort_by: 'popularity.desc' },
    })
    .then(r => r.data);

export default tmdbApi;
