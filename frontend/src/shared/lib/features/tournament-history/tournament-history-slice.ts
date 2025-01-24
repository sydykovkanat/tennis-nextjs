import { TournamentHistory } from '@/shared/types/tournament-history.types';
import { GlobalError } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

import { fetchTournamentHistory } from './tournament-history-thunks';

interface RewardsState {
  items: TournamentHistory[];
  pages: number;
  fetchTournamentHistoryLoading: boolean;
  fetchError: GlobalError | null;
}

const initialState: RewardsState = {
  items: [],
  pages: 1,
  fetchTournamentHistoryLoading: false,
  fetchError: null,
};

export const tournamentHistorySlice = createSlice({
  name: 'tournamentHistory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTournamentHistory.pending, (state) => {
        state.fetchTournamentHistoryLoading = true;
        state.fetchError = null;
        state.items = [];
      })
      .addCase(fetchTournamentHistory.fulfilled, (state, { payload }) => {
        state.items = payload.data;
        state.pages = payload.pages;
        state.fetchTournamentHistoryLoading = false;
        state.fetchError = null;
      })
      .addCase(fetchTournamentHistory.rejected, (state, { payload: error }) => {
        state.fetchTournamentHistoryLoading = false;
        state.fetchError = error || null;
        state.items = [];
      });
  },
  selectors: {
    selectSavedTournaments: (state) => state.items,
    selectSavedTournamentsPages: (state) => state.pages,
    selectSavedTournamentsFetching: (state) => state.fetchTournamentHistoryLoading,
    selectSavedTournamentsFetchError: (state) => state.fetchError,
  },
});

export const tournamentHistoryReducer = tournamentHistorySlice.reducer;

export const {
  selectSavedTournaments,
  selectSavedTournamentsPages,
  selectSavedTournamentsFetching,
  selectSavedTournamentsFetchError,
} = tournamentHistorySlice.selectors;
