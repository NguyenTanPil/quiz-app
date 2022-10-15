import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface CategoryState {
  id: string;
  name: string;
  note: string;
  color: string;
  isPublished: number;
}

export interface CategoryListState {
  categoryList: CategoryState[];
}

const initialState: CategoryListState = {
  categoryList: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    createCategoryList(state, action: PayloadAction<CategoryState[]>) {
      state.categoryList = action.payload;
    },
    addNewCategory(state, action: PayloadAction<CategoryState>) {
      state.categoryList.push(action.payload);
    },
    updateCategoryListById(state, action: PayloadAction<CategoryState>) {
      state.categoryList = state.categoryList.map((category: CategoryState) => {
        if (category.id === action.payload.id) {
          return action.payload;
        }

        return category;
      });
    },
  },
});

export const { createCategoryList, addNewCategory, updateCategoryListById } = categorySlice.actions;

export const selectCategoryList = (state: RootState) => state.category.categoryList;

export default categorySlice.reducer;
