import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import {
  FiStar, FiClock, FiCalendar, FiGlobe,
  FiPlay, FiDollarSign,
} from 'react-icons/fi';
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
} from '../hooks/useMovieDetails';
import { getImageUrl, formatRating, formatRuntime, formatDate, formatCurrency, getRatingColor } from '../utils/helpers';
import CastCard from '../components/movie/CastCard';
import MovieRow from '../components/home/MovieRow';
import LoadingSpinner from '../components/common/LoadingSpinner';
import styles from './MovieDetailPage.module.css';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const [showTrailer, setShowTrailer] = useState(false);

  const { data: movie, isLoading } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: similar } = useSimilarMovies(movieId);

  const trailer = videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || videos?.results.find((v) => v.site === 'YouTube');

  const director = credits?.crew.find((c) => c.job === 'Director');

  if (isLoading) {
    return <div className={styles.loadingPage}><LoadingSpinner size={60} /></div>;
  }

  if (!movie) {
    return (
      <div className={styles.errorPage}>
        <h2>Movie not found</h2>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>
      </div>
    );
  }

  const ratingColor = getRatingColor(movie.vote_average);

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Backdrop */}
      <div className={styles.backdrop}>
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className={styles.backdropImg}
        />
        <div className={styles.backdropGradient} />
      </div>

      {/* Hero Content */}
      <div className={`container ${styles.hero}`}>
        <div className={styles.heroContent}>
          {/* Poster */}
          <div className={styles.posterWrapper}>
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className={styles.poster}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/500x750/0e1420/7c3aed?text=No+Poster';
              }}
            />
          </div>

          {/* Details */}
          <div className={styles.details}>
            {/* Genres */}
            <div className={styles.genres}>
              {movie.genres.map((g) => (
                <Link
                  key={g.id}
                  to={`/genre/${g.id}?name=${encodeURIComponent(g.name)}`}
                  className={styles.genreTag}
                >
                  {g.name}
                </Link>
              ))}
            </div>

            <h1 className={styles.title}>{movie.title}</h1>

            {movie.tagline && (
              <p className={styles.tagline}>"{movie.tagline}"</p>
            )}

            {/* Meta row */}
            <div className={styles.metaRow}>
              <div className={styles.ratingCircle} style={{ borderColor: ratingColor }}>
                <span className={styles.ratingValue} style={{ color: ratingColor }}>
                  {formatRating(movie.vote_average)}
                </span>
                <span className={styles.ratingLabel}>/ 10</span>
              </div>
              <div className={styles.metaItems}>
                <div className={styles.metaItem}>
                  <FiCalendar size={14} className={styles.metaIcon} />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiClock size={14} className={styles.metaIcon} />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiGlobe size={14} className={styles.metaIcon} />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <p className={styles.overview}>{movie.overview}</p>

            {/* Financial */}
            <div className={styles.financials}>
              {movie.budget > 0 && (
                <div className={styles.financialItem}>
                  <FiDollarSign size={14} />
                  <span className={styles.financialLabel}>Budget</span>
                  <span className={styles.financialValue}>{formatCurrency(movie.budget)}</span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className={styles.financialItem}>
                  <FiDollarSign size={14} />
                  <span className={styles.financialLabel}>Revenue</span>
                  <span className={styles.financialValue}>{formatCurrency(movie.revenue)}</span>
                </div>
              )}
              {director && (
                <div className={styles.financialItem}>
                  <FiStar size={14} />
                  <span className={styles.financialLabel}>Director</span>
                  <span className={styles.financialValue}>{director.name}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            {trailer && (
              <>
                <button
                  className={styles.trailerBtn}
                  onClick={() => setShowTrailer(true)}
                >
                  <FiPlay size={18} />
                  Watch Trailer
                </button>
                {showTrailer && (
                  <TrailerModal
                    trailerKey={trailer.key}
                    trailerName={trailer.name}
                    onClose={() => setShowTrailer(false)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cast */}
      {credits && credits.cast.length > 0 && (
        <div className={`container ${styles.section}`}>
          <h2 className="section-title">Cast</h2>
          <div className={`scroll-row ${styles.castRow}`}>
            {credits.cast.slice(0, 20).map((c) => (
              <CastCard key={`${c.id}-${c.character}`} cast={c} />
            ))}
          </div>
        </div>
      )}

      {/* Similar Movies */}
      {similar && similar.results.length > 0 && (
        <div className="container">
          <MovieRow
            title="Similar Movies"
            movies={similar.results}
          />
        </div>
      )}

    </div>
  );
};

// Separate portal component so it mounts on document.body,
// escaping any CSS transform containment on the page
const TrailerModal: React.FC<{
  trailerKey: string;
  trailerName: string;
  onClose: () => void;
}> = ({ trailerKey, trailerName, onClose }) =>
  createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close trailer">✕</button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title={trailerName}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>,
    document.body
  );

export default MovieDetailPage;
