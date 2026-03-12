import { useQuery } from '@tanstack/react-query';
import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies } from '../api/tmdb';

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });

export const useMovieCredits = (id: number) =>
  useQuery({
    queryKey: ['movieCredits', id],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });

export const useMovieVideos = (id: number) =>
  useQuery({
    queryKey: ['movieVideos', id],
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });

export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: ['similarMovies', id],
    queryFn: () => getSimilarMovies(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
