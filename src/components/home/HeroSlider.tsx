import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FiStar, FiPlayCircle, FiInfo } from 'react-icons/fi';
import { getImageUrl, formatRating, getYearFromDate } from '../../utils/helpers';
import type { Movie } from '../../types/tmdb';
import styles from './HeroSlider.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroSliderProps {
  movies: Movie[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ movies }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.heroWrapper}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: `.${styles.pagination}` }}
        loop
        className={styles.swiper}
        onAutoplayTimeLeft={(_s, _t, progress) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${1 - progress})`;
          }
        }}
      >
        {movies.slice(0, 8).map((movie) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <div className={styles.slide}>
                {/* Backdrop */}
                <div className={styles.backdrop}>
                  <img
                    src={getImageUrl(movie.backdrop_path, 'original')}
                    alt={movie.title}
                    className={styles.backdropImg}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/1280x720/0e1420/7c3aed?text=';
                    }}
                  />
                  <div className={styles.gradientOverlay} />
                </div>

                {/* Content */}
                <div className={`container ${styles.content}`}>
                  <div className={`${styles.text} ${isActive ? styles.textActive : ''}`}>
                    <div className={styles.meta}>
                      <span className={`badge badge-rating ${styles.ratingBadge}`}>
                        <FiStar size={11} />
                        {formatRating(movie.vote_average)}
                      </span>
                      <span className={styles.year}>{getYearFromDate(movie.release_date)}</span>
                    </div>

                    <h1 className={styles.title}>{movie.title}</h1>

                    <p className={styles.overview}>
                      {movie.overview
                        ? movie.overview.substring(0, 220) + (movie.overview.length > 220 ? '…' : '')
                        : ''}
                    </p>

                    <div className={styles.actions}>
                      <Link to={`/movie/${movie.id}`} className={styles.btnPrimary}>
                        <FiPlayCircle size={18} />
                        <span>View Details</span>
                      </Link>
                      <Link to={`/movie/${movie.id}`} className={styles.btnSecondary}>
                        <FiInfo size={16} />
                        <span>More Info</span>
                      </Link>
                    </div>
                  </div>

                  {/* Floating Poster */}
                  <div className={`${styles.posterWrap} ${isActive ? styles.posterActive : ''}`}>
                    <img
                      src={getImageUrl(movie.poster_path, 'w342')}
                      alt={movie.title}
                      className={styles.poster}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className={styles.posterGlow} />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className={`container ${styles.paginationWrapper}`}>
        <div className={styles.pagination} />
        <div className={styles.progressBar}>
          <div className={styles.progressFill} ref={progressRef} />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
