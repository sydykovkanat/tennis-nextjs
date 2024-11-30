import { getBlogs } from '@/actions/blog';
import { BlogCard } from '@/shared/components/shared/blogs/blog-card';
import { cn } from '@/shared/lib/utils';

import React from 'react';

import styles from './blogs.module.css';

interface Props {
  className?: string;
}

export const Blogs: React.FC<Props> = async ({ className }) => {
  const blogs = await getBlogs();

  return (
    <section className={cn(styles.blogs, className)}>
      {blogs.data.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </section>
  );
};
