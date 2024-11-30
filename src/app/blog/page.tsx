import { getBlogs } from '@/actions/blog';
import { Blogs, Container } from '@/shared/components/shared';
import { BlogPagination } from '@/shared/components/shared/blogs/blog-pagination';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | null } }) {
  const blogs = await getBlogs(searchParams.page);

  return (
    <Container>
      <MainTitles title={'Свежие новости'} subtitle={'НАШ БЛОГ'} />

      <Blogs className={'mb-14'} blogs={blogs} />

      <BlogPagination className={'mb-20'} page={searchParams.page} totalPages={blogs.pages} />
    </Container>
  );
}
