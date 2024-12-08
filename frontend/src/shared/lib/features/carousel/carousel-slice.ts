import {
  deleteImageCarousel,
  getCarousel,
  postFetchCarousel,
  updateCarouselImage,
} from '@/shared/lib/features/carousel/carousel-thunks';
import { CarouselTypes } from '@/shared/types/carousel.types';
import { GlobalError } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export interface carouselState {
  img: CarouselTypes[];
  loadingImgCarousel: boolean;
  deleteImgCarousel: boolean;
  errorImgCarousel: GlobalError | null;
}

export const initialState: carouselState = {
  img: [],
  loadingImgCarousel: false,
  deleteImgCarousel: false,
  errorImgCarousel: null,
};

export const CarouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCarousel.pending, (state) => {
      state.loadingImgCarousel = true;
      state.errorImgCarousel = null;
    });
    builder.addCase(getCarousel.fulfilled, (state, { payload: img }) => {
      state.loadingImgCarousel = false;
      state.img = img;
    });
    builder.addCase(getCarousel.rejected, (state) => {
      state.loadingImgCarousel = false;
      state.errorImgCarousel = null;
    });

    builder.addCase(postFetchCarousel.pending, (state) => {
      state.loadingImgCarousel = true;
      state.errorImgCarousel = null;
    });
    builder.addCase(postFetchCarousel.fulfilled, (state) => {
      state.loadingImgCarousel = false;
    });
    builder.addCase(postFetchCarousel.rejected, (state) => {
      state.loadingImgCarousel = false;
      state.errorImgCarousel = null;
    });

    builder.addCase(deleteImageCarousel.pending, (state) => {
      state.deleteImgCarousel = true;
      state.errorImgCarousel = null;
    });
    builder.addCase(deleteImageCarousel.fulfilled, (state) => {
      state.deleteImgCarousel = false;
    });
    builder.addCase(deleteImageCarousel.rejected, (state, { payload: error }) => {
      toast.warning(error?.error);
      state.deleteImgCarousel = false;
      state.errorImgCarousel = error || null;
    });

    builder.addCase(updateCarouselImage.pending, (state) => {
      state.loadingImgCarousel = true;
      state.errorImgCarousel = null;
    });
    builder.addCase(updateCarouselImage.fulfilled, (state) => {
      state.loadingImgCarousel = false;
    });
    builder.addCase(updateCarouselImage.rejected, (state, { payload: error }) => {
      state.loadingImgCarousel = false;
      state.errorImgCarousel = error || null;
    });
  },
  selectors: {
    photoCarouselState: (state) => state.img,
    loadingCarouselState: (state) => state.loadingImgCarousel,
    deleteCarouselState: (state) => state.deleteImgCarousel,
    errorImgCarouselState: (state) => state.errorImgCarousel,
  },
});

export const CarouselReducer = CarouselSlice.reducer;
export const { photoCarouselState, deleteCarouselState, loadingCarouselState, errorImgCarouselState } =
  CarouselSlice.selectors;
