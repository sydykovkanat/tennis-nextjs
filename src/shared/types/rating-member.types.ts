export interface RatingMember {
  _id: string;
  name: string;
  image: string | null | File;
  gender: string;
  place: number;
  ratingType: 'mensTop8' | 'mensTop3' | 'womensTop3';
  mensRatingCategoryTop8?: string;
  mensRatingCategoryTop3?: string;
  womensRatingCategoryTop3?: string;
}