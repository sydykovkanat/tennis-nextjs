import { BlogCard } from '@/shared/components/shared/blogs/blog-card';
import { cn } from '@/shared/lib/utils';
import { Blogs as BlogsTypes } from '@/shared/types/blog.types';

import React from 'react';

import styles from './blogs.module.css';

interface Props {
  className?: string;
  blogs: BlogsTypes;
}

export const Blogs: React.FC<Props> = async ({ className, blogs }) => {
  return (
    <section className={cn(styles.blogs, className)}>
      {blogs.data.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </section>
  );
};
