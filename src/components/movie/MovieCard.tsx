import React from 'react';
import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { getImageUrl, formatRating } from '../../utils/helpers';
import type { Movie } from '../../types/tmdb';

interface MovieCardProps {
  movie: Movie;
  width?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, width }) => {
  const posterUrl = getImageUrl(movie.poster_path, 'w342');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={styles.card}
      style={width ? { width } : undefined}
    >
      <div className={styles.poster}>
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/342x513/0e1420/7c3aed?text=No+Poster';
          }}
        />
        <div className={styles.overlay}>
          <p className={styles.overview}>
            {movie.overview
              ? movie.overview.length > 120
                ? movie.overview.substring(0, 120) + '…'
                : movie.overview
              : 'No description available.'}
          </p>
        </div>
        <div className={styles.rating}>
          <FiStar size={11} />
          <span>{formatRating(movie.vote_average)}</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        {year && <span className={styles.year}>{year}</span>}
      </div>
    </Link>
  );
};

export default MovieCard;
