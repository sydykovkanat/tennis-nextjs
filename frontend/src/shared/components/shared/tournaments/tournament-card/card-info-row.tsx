import styles from './tournament-card.module.css';

export const CardInfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className={styles.indoRowWrapper}>
    <span>{label}</span>
    <span className={styles.cardInfoWrapperText}>{value}</span>
  </div>
);
