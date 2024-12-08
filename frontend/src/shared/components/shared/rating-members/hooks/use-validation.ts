import { RatingMember, RatingMemberMutation } from '@/shared/types/rating-member.types';

export const useValidation = (
  state: RatingMemberMutation,
  ratingMembers: RatingMember[],
  existingMember?: RatingMember,
  isLoading?: boolean,
) => {
  const allMembersNames = ratingMembers?.map((member) => member.name.toLowerCase());
  const existingName = allMembersNames?.includes(state.name.toLowerCase());
  const membersInTargetType = ratingMembers.filter(
    (member) => member.ratingType === state.ratingType && (!existingMember || member._id !== existingMember._id),
  );

  const maxMembersExceeded =
    state.gender === 'female'
      ? membersInTargetType.length >= 3
      : state.ratingType === 'mensTop8'
        ? membersInTargetType.length >= 8
        : state.ratingType === 'mensTop3'
          ? membersInTargetType.length >= 3
          : false;

  const isFormInvalid =
    isLoading ||
    !state.place ||
    state.image === null ||
    (!existingMember && existingName) ||
    (existingMember && existingMember.name !== state.name && existingName) ||
    maxMembersExceeded;

  return { isFormInvalid, existingName, maxMembersExceeded };
};
