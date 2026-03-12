import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiFilm, FiX, FiMenu } from 'react-icons/fi';
import { useGenres } from '../../hooks/useGenres';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: genreData } = useGenres();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setGenreOpen(false);
  }, [location.pathname]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchValue.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
        setSearchOpen(false);
        setSearchValue('');
      }
    },
    [searchValue, navigate]
  );

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <FiFilm size={22} />
          <span>CineVerse</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          <li><Link to="/" className={styles.link}>Home</Link></li>
          <li
            className={styles.dropdownWrapper}
            onMouseEnter={() => setGenreOpen(true)}
            onMouseLeave={() => setGenreOpen(false)}
          >
            <span className={styles.link}>Genres ▾</span>
            {genreOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownGrid}>
                  {genreData?.genres.slice(0, 16).map((g) => (
                    <Link
                      key={g.id}
                      to={`/genre/${g.id}?name=${encodeURIComponent(g.name)}`}
                      className={styles.dropdownItem}
                    >
                      {g.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* Search */}
        <div className={styles.actions}>
          {searchOpen ? (
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <FiSearch size={16} className={styles.searchIcon} />
              <input
                autoFocus
                type="text"
                placeholder="Search movies…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className={styles.iconBtn}
              >
                <FiX size={18} />
              </button>
            </form>
          ) : (
            <button
              className={styles.iconBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileLink}>Home</Link>
          <div className={styles.mobileDivider}>Genres</div>
          <div className={styles.mobileGenres}>
            {genreData?.genres.slice(0, 12).map((g) => (
              <Link
                key={g.id}
                to={`/genre/${g.id}?name=${encodeURIComponent(g.name)}`}
                className={styles.mobileGenreTag}
              >
                {g.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
