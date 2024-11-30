import { getBlogs } from '@/actions/blog';
import { BlogPagination, Blogs, Container, MainTitles } from '@/shared/components/shared';

import styles from './page.module.css';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | null } }) {
  const blogs = await getBlogs(searchParams.page || '1');

  return (
    <Container>
      <MainTitles title={'Свежие новости'} subtitle={'НАШ БЛОГ'} />

      <Blogs className={styles.blogs} blogs={blogs} />

      <BlogPagination className={styles.pagination} page={searchParams.page} totalPages={blogs.pages} />
    </Container>
  );
}
