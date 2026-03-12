import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/tmdb';

export const useSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const result = useQuery({
    queryKey: ['search', debouncedQuery, page],
    queryFn: () => searchMovies(debouncedQuery, page),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 2,
  });

  return { query, setQuery, page, setPage, debouncedQuery, ...result };
};
