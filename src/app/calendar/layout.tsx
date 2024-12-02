import React from 'react';

import styles from './page.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.calendarLayout}>{children}</div>;
}
