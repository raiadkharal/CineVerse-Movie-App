import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiFilm } from 'react-icons/fi';
import { useMoviesByGenre } from '../hooks/useGenres';
import MovieGrid from '../components/movie/MovieGrid';
import styles from './GenrePage.module.css';

const GenrePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const genreName = searchParams.get('name') || 'Genre';
  const genreId = Number(id);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useMoviesByGenre(genreId, page);

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={`${styles.page} page-enter`}>
      <div className="container">
        <div className={styles.header}>
          <FiFilm size={28} className={styles.headerIcon} />
          <div>
            <p className={styles.headerLabel}>Browse by Genre</p>
            <h1 className={styles.title}>{genreName}</h1>
          </div>
        </div>

        {data && (
          <p className={styles.count}>
            {data.total_results.toLocaleString()} movies
          </p>
        )}

        <MovieGrid movies={data?.results ?? []} isLoading={isLoading} skeletonCount={20} />

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {page} / {Math.min(totalPages, 500)}
            </span>
            <button
              className={styles.pageBtn}
              disabled={page >= totalPages}
              onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
