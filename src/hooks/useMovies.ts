import { useQuery } from '@tanstack/react-query';
import { getTrending, getPopular, getNowPlaying, getTopRated } from '../api/tmdb';

export const useTrending = (timeWindow: 'day' | 'week' = 'week') =>
  useQuery({
    queryKey: ['trending', timeWindow],
    queryFn: () => getTrending(timeWindow),
    staleTime: 1000 * 60 * 5,
  });

export const usePopular = (page = 1) =>
  useQuery({
    queryKey: ['popular', page],
    queryFn: () => getPopular(page),
    staleTime: 1000 * 60 * 5,
  });

export const useNowPlaying = () =>
  useQuery({
    queryKey: ['nowPlaying'],
    queryFn: () => getNowPlaying(),
    staleTime: 1000 * 60 * 5,
  });

export const useTopRated = () =>
  useQuery({
    queryKey: ['topRated'],
    queryFn: () => getTopRated(),
    staleTime: 1000 * 60 * 5,
  });
