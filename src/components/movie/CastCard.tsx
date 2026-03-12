import React from 'react';
import { getImageUrl } from '../../utils/helpers';
import type { CastMember } from '../../types/tmdb';
import styles from './CastCard.module.css';

interface CastCardProps {
  cast: CastMember;
}

const CastCard: React.FC<CastCardProps> = ({ cast }) => {
  const imgSrc = cast.profile_path
    ? getImageUrl(cast.profile_path, 'w185')
    : 'https://via.placeholder.com/185x278/0e1420/475569?text=' + encodeURIComponent(cast.name[0]);

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <img src={imgSrc} alt={cast.name} loading="lazy" />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{cast.name}</span>
        <span className={styles.character}>{cast.character || cast.known_for_department}</span>
      </div>
    </div>
  );
};

export default CastCard;
