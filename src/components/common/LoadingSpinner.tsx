import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div className={styles.wrapper}>
    <div
      className={styles.spinner}
      style={{ width: size, height: size }}
    />
  </div>
);

export default LoadingSpinner;
