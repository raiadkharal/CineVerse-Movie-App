import React from 'react';
import MovieCard from './MovieCard';
import SkeletonCard from '../common/SkeletonCard';
import type { Movie } from '../../types/tmdb';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  skeletonCount?: number;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  isLoading = false,
  skeletonCount = 20,
}) => {
  if (isLoading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="movie-grid fade-in">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
