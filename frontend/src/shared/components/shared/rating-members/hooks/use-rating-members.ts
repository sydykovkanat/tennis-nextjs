'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectRatingMembers,
  selectRatingMembersFetching,
} from '@/shared/lib/features/rating-members/rating-members-slice';
import { fetchRatingMembers } from '@/shared/lib/features/rating-members/rating-members-thunks';

import { useEffect } from 'react';

export const useRatingMembers = () => {
  const dispatch = useAppDispatch();
  const ratingMembers = useAppSelector(selectRatingMembers);
  const ratingMembersFetching = useAppSelector(selectRatingMembersFetching);

  const ratingMenMembersTop8 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop8',
  );
  const ratingMenMembersTop3 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop3',
  );
  const ratingWomenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'female');

  const hasDuplicatePlaces = (members: typeof ratingMembers): boolean => {
    const placeCounts = members.map((member) => member.place);
    const uniquePlaces = new Set(placeCounts);
    return uniquePlaces.size !== placeCounts.length;
  };

  const hasFewMembers = (members: typeof ratingMembers, requiredCount: number): boolean => {
    return members.length < requiredCount;
  };

  const duplicatePlaces = {
    mensTop8: hasDuplicatePlaces(ratingMenMembersTop8),
    mensTop3: hasDuplicatePlaces(ratingMenMembersTop3),
    womensTop3: hasDuplicatePlaces(ratingWomenMembers),
  };

  const fewMembersWarning = {
    mensTop8: hasFewMembers(ratingMenMembersTop8, 8),
    mensTop3: hasFewMembers(ratingMenMembersTop3, 3),
    womensTop3: hasFewMembers(ratingWomenMembers, 3),
  };

  useEffect(() => {
    dispatch(fetchRatingMembers());
  }, [dispatch]);

  return {
    ratingMembers,
    ratingMembersFetching,
    ratingMenMembersTop8,
    ratingMenMembersTop3,
    ratingWomenMembers,
    duplicatePlaces,
    fewMembersWarning,
  };
};
