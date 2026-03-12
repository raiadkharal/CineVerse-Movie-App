import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard: React.FC = () => (
  <div className={styles.card}>
    <div className={`${styles.poster} skeleton`} />
    <div className={styles.info}>
      <div className={`${styles.titleBar} skeleton`} />
      <div className={`${styles.yearBar} skeleton`} />
    </div>
  </div>
);

export default SkeletonCard;
