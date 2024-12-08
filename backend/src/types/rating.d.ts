export interface RatingMemberFields {
  name: string;
  image: string;
  gender: 'male' | 'female';
  place: number;
  ratingType: 'mensTop8' | 'mensTop3' | 'womensTop3';
  mensRatingCategoryTop8?: string;
  mensRatingCategoryTop3?: string;
  womensRatingCategoryTop3?: string;
}
