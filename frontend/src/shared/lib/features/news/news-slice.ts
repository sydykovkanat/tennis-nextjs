import { createNews, fetchNews, fetchOneNews, removeNews, updateNews } from '@/shared/lib/features/news/news-thunks';
import { News } from '@/shared/types/news.types';
import { createSlice } from '@reduxjs/toolkit';

interface NewsState {
  news: News[];
  pages: number;
  oneNews: News | null;
  createNewsLoading: boolean;
  fetchNewsLoading: boolean;
  fetchOneNewsLoading: boolean;
  updateNewsLoading: boolean;
  removeNewsLoading: boolean | string;
}

const initialState: NewsState = {
  news: [],
  pages: 1,
  oneNews: null,
  createNewsLoading: false,
  fetchNewsLoading: false,
  fetchOneNewsLoading: false,
  updateNewsLoading: false,
  removeNewsLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNews.pending, (state) => {
        state.createNewsLoading = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.createNewsLoading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.createNewsLoading = false;
      });

    builder
      .addCase(fetchNews.pending, (state) => {
        state.fetchNewsLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        state.news = payload.data;
        state.pages = payload.pages;
        state.fetchNewsLoading = false;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.fetchNewsLoading = false;
      });

    builder
      .addCase(fetchOneNews.pending, (state) => {
        state.fetchOneNewsLoading = true;
        state.oneNews = null;
      })
      .addCase(fetchOneNews.fulfilled, (state, { payload: oneNews }) => {
        state.fetchOneNewsLoading = false;
        state.oneNews = null;
        state.oneNews = oneNews;
      })
      .addCase(fetchOneNews.rejected, (state) => {
        state.fetchOneNewsLoading = false;
      });

    builder
      .addCase(updateNews.pending, (state) => {
        state.updateNewsLoading = true;
      })
      .addCase(updateNews.fulfilled, (state) => {
        state.updateNewsLoading = false;
      })
      .addCase(updateNews.rejected, (state) => {
        state.updateNewsLoading = false;
      });

    builder
      .addCase(removeNews.pending, (state, { meta }) => {
        state.removeNewsLoading = meta.arg;
      })
      .addCase(removeNews.fulfilled, (state) => {
        state.removeNewsLoading = false;
      })
      .addCase(removeNews.rejected, (state) => {
        state.removeNewsLoading = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectNewsPages: (state) => state.pages,
    selectOneNews: (state) => state.oneNews,
    selectCreateNewsLoading: (state) => state.createNewsLoading,
    selectFetchNewsLoading: (state) => state.fetchNewsLoading,
    selectFetchOneNewsLoading: (state) => state.fetchOneNewsLoading,
    selectUpdateNewsLoading: (state) => state.updateNewsLoading,
    selectRemoveNewsLoading: (state) => state.removeNewsLoading,
  },
});

export const newsReducer = newsSlice.reducer;

export const {
  selectNews,
  selectNewsPages,
  selectOneNews,
  selectCreateNewsLoading,
  selectFetchOneNewsLoading,
  selectFetchNewsLoading,
  selectUpdateNewsLoading,
  selectRemoveNewsLoading,
} = newsSlice.selectors;
