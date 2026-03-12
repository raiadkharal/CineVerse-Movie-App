import { useQuery } from '@tanstack/react-query';
import { getGenres, getMoviesByGenre } from '../api/tmdb';

export const useGenres = () =>
  useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60,
  });

export const useMoviesByGenre = (genreId: number, page = 1) =>
  useQuery({
    queryKey: ['moviesByGenre', genreId, page],
    queryFn: () => getMoviesByGenre(genreId, page),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 5,
  });
