import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import MovieCard from '../movie/MovieCard';
import SkeletonCard from '../common/SkeletonCard';
import type { Movie } from '../../types/tmdb';
import styles from './MovieRow.module.css';

interface MovieRowProps {
  title: string;
  movies?: Movie[];
  isLoading?: boolean;
  viewAllLink?: string;
  icon?: React.ReactNode;
}

const CARD_WIDTH = '168px';

const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  isLoading = false,
  viewAllLink,
  icon,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 600;
      scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className="section-title">
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </h2>
        <div className={styles.headerRight}>
          {viewAllLink && (
            <Link to={viewAllLink} className={styles.viewAll}>
              View All <FiArrowRight size={14} />
            </Link>
          )}
          <div className={styles.arrows}>
            <button className={styles.arrowBtn} onClick={() => scroll('left')} aria-label="Scroll left">
              <FiChevronLeft size={20} />
            </button>
            <button className={styles.arrowBtn} onClick={() => scroll('right')} aria-label="Scroll right">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={`scroll-row ${styles.row}`} ref={scrollRef}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ width: CARD_WIDTH, flexShrink: 0 }}>
                <SkeletonCard />
              </div>
            ))
          : movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} width={CARD_WIDTH} />
            ))}
      </div>
    </div>
  );
};

export default MovieRow;
