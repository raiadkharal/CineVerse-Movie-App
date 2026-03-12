import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import MovieRow from '../components/home/MovieRow';
import { useTrending, usePopular, useNowPlaying, useTopRated } from '../hooks/useMovies';
import { FiTrendingUp, FiStar, FiFilm, FiClock } from 'react-icons/fi';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const { data: trending, isLoading: loadingTrending } = useTrending('week');
  const { data: popular, isLoading: loadingPopular } = usePopular();
  const { data: nowPlaying, isLoading: loadingNowPlaying } = useNowPlaying();
  const { data: topRated, isLoading: loadingTopRated } = useTopRated();

  return (
    <div className={styles.page}>
      {/* Hero */}
      {loadingTrending ? (
        <div className={styles.heroSkeleton} />
      ) : trending?.results?.length ? (
        <HeroSlider movies={trending.results} />
      ) : null}

      {/* Sections */}
      <div className={`container ${styles.sections}`}>
        <MovieRow
          title="Trending This Week"
          movies={trending?.results}
          isLoading={loadingTrending}
          icon={<FiTrendingUp />}
        />

        <MovieRow
          title="Now Playing"
          movies={nowPlaying?.results}
          isLoading={loadingNowPlaying}
          icon={<FiClock />}
        />

        <MovieRow
          title="Popular"
          movies={popular?.results}
          isLoading={loadingPopular}
          icon={<FiFilm />}
        />

        <MovieRow
          title="Top Rated"
          movies={topRated?.results}
          isLoading={loadingTopRated}
          icon={<FiStar />}
        />
      </div>
    </div>
  );
};

export default HomePage;
