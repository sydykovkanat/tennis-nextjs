import { cn } from '@/shared/lib';
import { GradientCirclesTypes } from '@/shared/types/gradient-circles';

import React from 'react';

import styles from './gradient-circles.module.css';

interface Props {
  width: string;
  height: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  visible: string;
}

export const GradientCircle: React.FC<Props> = ({ width, height, top, right, left, bottom, visible }) => {
  return (
    <div
      className={cn(styles.circle, {
        [styles.hidden]: visible !== 'block',
        [styles.visible]: visible === 'block',
        [styles.responsiveHidden]: visible === 'block',
        [styles.xlVisible]: true,
        [styles.threeXlHidden]: true,
      })}
      style={{
        width,
        height,
        top,
        right,
        left,
        bottom,
      }}
    />
  );
};

export const gradientCircles: GradientCirclesTypes[] = [
  { width: '283px', height: '283px', top: '-90px', right: '-90px', visible: 'block' },
  { width: '660px', height: '675px', top: '213px', left: '80px', visible: 'block' },
  { width: '660px', height: '675px', top: '545px', right: '123px', visible: 'hidden' },
  { width: '660px', height: '675px', top: '1030px', left: '-60px', visible: 'hidden' },
  { width: '660px', height: '675px', top: '1346px', right: '-195px', visible: 'block' },
  { width: '516px', height: '528px', top: '2000px', left: '147px', visible: 'hidden' },
  { width: '630px', height: '654px', bottom: '1800px', right: '-100px', visible: 'hidden' },
  { width: '630px', height: '654px', bottom: '1500px', left: '-20px', visible: 'block' },
  { width: '516px', height: '528px', bottom: '628px', right: '170px', visible: 'block' },
];
