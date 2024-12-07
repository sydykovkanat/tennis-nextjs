'use client';

import { Loader, RatingMembersAdminList, Title } from '@/shared/components/shared';
import { useRatingMembers } from '@/shared/components/shared/rating-members/hooks';
import RatingMemberNew from '@/shared/components/shared/rating-members/rating-member-new/rating-member-new';

export const RatingMembersAdmin = () => {
  const {
    ratingMembers,
    ratingMembersFetching,
    ratingMenMembersTop8,
    ratingMenMembersTop3,
    ratingWomenMembers,
    duplicatePlaces,
  } = useRatingMembers();

  return ratingMembersFetching ? (
    <Loader fixed />
  ) : (
    <div className='lg:max-w-[900px] lg:mx-auto mb-7 mt-3'>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-4'>
        <div>
          <Title variant='h1' className='text-2xl font-medium leading-none mb-1'>
            Рейтинги топ-участников
          </Title>
          <small className='text-muted-foreground text-base'>Управление рейтингам и категориями рейтингов</small>
        </div>
        {/*<div>*/}
        {/*  <CategoriesEditAction ratingMembers={ratingMembers} />*/}
        {/*</div>*/}
      </div>
      <div className='flex flex-col gap-14'>
        <div className='w-full'>
          <RatingMemberNew
            forWhichGender={'male'}
            ratingMembers={ratingMembers}
            className='text-center sm:text-right mb-5'
          />
          <RatingMembersAdminList
            ratingMembers={ratingMenMembersTop8}
            ratingMembersAll={ratingMembers}
            title='Топ-8 мужского'
            category={ratingMembers[0]?.mensRatingCategoryTop8 || 'Здесь будет категория'}
            hasDuplicatePlaces={duplicatePlaces.mensTop8}
            className='mb-10'
          />
          <RatingMembersAdminList
            ratingMembers={ratingMenMembersTop3}
            ratingMembersAll={ratingMembers}
            title='Топ-3 мужского'
            category={ratingMembers[0]?.mensRatingCategoryTop3 || 'Здесь будет категория'}
            hasDuplicatePlaces={duplicatePlaces.mensTop3}
          />
        </div>
        <div>
          <RatingMemberNew
            forWhichGender={'female'}
            ratingMembers={ratingMembers}
            className='text-center sm:text-right mb-5'
          />
          <RatingMembersAdminList
            ratingMembers={ratingWomenMembers}
            ratingMembersAll={ratingMembers}
            title='Топ-3 женского'
            category={ratingMembers[0]?.womensRatingCategoryTop3 || 'Здесь будет категория'}
            hasDuplicatePlaces={duplicatePlaces.womensTop3}
          />
        </div>
      </div>
    </div>
  );
};
