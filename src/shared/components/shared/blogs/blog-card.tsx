import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { Blog } from '@/shared/types/blog.types';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import styles from './blog-card.module.css';

interface Props {
  className?: string;
  blog: Blog;
}

export const BlogCard: React.FC<Props> = ({ className, blog }) => {
  return (
    <Link href={`/blog/${blog._id}`} className={cn(styles.card, className)}>
      <Image width={300} height={320} src={`${API_URL}/${blog.newsCover}`} alt={blog.title} priority unoptimized />

      <div className={styles.header}>
        <h4>{blog.subtitle}</h4>

        <span>{blog.createdAt}</span>
      </div>

      <h3>{blog.title}</h3>
    </Link>
  );
};
