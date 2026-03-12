import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiXCircle } from 'react-icons/fi';
import { useSearch } from '../hooks/useSearch';
import MovieGrid from '../components/movie/MovieGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import styles from './SearchPage.module.css';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const { query, setQuery, debouncedQuery, data, isFetching, page, setPage } = useSearch(urlQuery);

  // Sync URL → search hook on mount
  useEffect(() => {
    setQuery(urlQuery);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  const totalPages = data?.total_pages ?? 0;
  const hasResults = (data?.results?.length ?? 0) > 0;

  return (
    <div className={`${styles.page} page-enter`}>
      <div className="container">
        {/* Search Bar */}
        <div className={styles.searchHeader}>
          <div className={styles.searchBox}>
            <FiSearch size={20} className={styles.searchIcon} />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for a movie…"
              className={styles.input}
            />
            {query && (
              <button
                className={styles.clearBtn}
                onClick={() => { setQuery(''); setSearchParams({}); }}
              >
                <FiXCircle size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {debouncedQuery.length >= 2 ? (
          <>
            <div className={styles.resultsHeader}>
              {data && (
                <p className={styles.resultCount}>
                  {data.total_results.toLocaleString()} results for &ldquo;{debouncedQuery}&rdquo;
                </p>
              )}
            </div>

            {isFetching && !data ? (
              <LoadingSpinner size={48} />
            ) : hasResults ? (
              <>
                <MovieGrid movies={data!.results} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      className={styles.pageBtn}
                      disabled={page === 1}
                      onClick={() => setPage(p => p - 1)}
                    >
                      Previous
                    </button>
                    <span className={styles.pageInfo}>
                      Page {page} / {Math.min(totalPages, 500)}
                    </span>
                    <button
                      className={styles.pageBtn}
                      disabled={page >= totalPages}
                      onClick={() => setPage(p => p + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              !isFetching && (
                <div className={styles.empty}>
                  <FiSearch size={48} opacity={0.3} />
                  <h3>No results found</h3>
                  <p>Try a different keyword</p>
                </div>
              )
            )}
          </>
        ) : (
          <div className={styles.placeholder}>
            <FiSearch size={64} opacity={0.15} />
            <h2>Discover Movies</h2>
            <p>Search for your favourite film, actor, or franchise</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
