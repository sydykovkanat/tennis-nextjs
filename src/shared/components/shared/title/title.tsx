import React from 'react';

interface Props {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({ variant, className, children }) => {
  const Tag = variant;

  return <Tag className={className}>{children}</Tag>;
};
