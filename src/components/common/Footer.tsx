import React from 'react';
import { Link } from 'react-router-dom';
import { FiFilm, FiGithub, FiHeart } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.inner}`}>
      <Link to="/" className={styles.logo}>
        <FiFilm size={18} />
        <span>CineVerse</span>
      </Link>

      <p className={styles.credit}>
        <FiHeart size={12} className={styles.heart} />
        Built with React & TypeScript — Data by{' '}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.tmdbLink}
        >
          TMDB
        </a>
      </p>

      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubLink}
        aria-label="GitHub"
      >
        <FiGithub size={18} />
      </a>
    </div>
  </footer>
);

export default Footer;
