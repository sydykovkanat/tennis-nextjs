import { createCategory, fetchCategories, fetchCategory, removeCategory, updateCategory } from '@/shared/lib/features/categories/category-thunks';
import { Category } from '@/shared/types/category.types';
import { createSlice } from '@reduxjs/toolkit';


interface RanksState {
  categories: Category[];
  category: Category | null;
  categoriesFetching: boolean;
  categoryRemoving: string | false;
  categoryCreating: boolean;
  categoryUpdating: boolean;
  categoryFetching: boolean;
}

const initialState: RanksState = {
  categories: [],
  category: null,
  categoriesFetching: false,
  categoryRemoving: false,
  categoryCreating: false,
  categoryUpdating: false,
  categoryFetching: true,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: ranks }) => {
        state.categories = ranks;
        state.categoriesFetching = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesFetching = false;
      });

    builder
      .addCase(removeCategory.pending, (state, { meta }) => {
        state.categoryRemoving = meta.arg;
      })
      .addCase(removeCategory.fulfilled, (state) => {
        state.categoryRemoving = false;
      })
      .addCase(removeCategory.rejected, (state) => {
        state.categoryRemoving = false;
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.categoryCreating = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload: category }) => {
        state.categories.push(category);
        state.categoryCreating = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.categoryCreating = false;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.categoryUpdating = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.categoryUpdating = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.categoryUpdating = false;
      });

    builder
      .addCase(fetchCategory.pending, (state) => {
        state.category = null;
        state.categoryFetching = true;
      })
      .addCase(fetchCategory.fulfilled, (state, { payload: category }) => {
        state.category = category;
        state.categoryFetching = false;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.categoryFetching = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectCategory: (state) => state.category,
    selectCategoryFetching: (state) => state.categoryFetching,
    selectCategoriesFetching: (state) => state.categoriesFetching,
    selectCategoryDeleting: (state) => state.categoryRemoving,
    selectCategoryCreating: (state) => state.categoryCreating,
    selectCategoryUpdating: (state) => state.categoryUpdating,
  },
});

export const {
  selectCategories,
  selectCategory,
  selectCategoryFetching,
  selectCategoriesFetching,
  selectCategoryDeleting,
  selectCategoryCreating,
  selectCategoryUpdating,
} = categorySlice.selectors;
