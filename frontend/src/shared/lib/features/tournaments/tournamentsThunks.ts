import { axiosApi } from '@/shared/lib';
import { TournamentMutation, Tournaments, UpdateTournamentArg } from '@/shared/types/tournament.types';
import { GlobalError } from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const fetchTournaments = createAsyncThunk<Tournaments, string | undefined>(
  'tournaments/fetchAll',
  async (rank) => {
    const { data: tournaments } = await axiosApi.get<Tournaments>('/tournaments', { params: { rank: rank } });

    return tournaments;
  },
);

export const createTournament = createAsyncThunk<void, TournamentMutation, { rejectValue: GlobalError }>(
  'tournaments/create',
  async (tournamentMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(tournamentMutation) as (keyof TournamentMutation)[];
      keys.forEach((key) => {
        const value = tournamentMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post('/tournaments', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const deleteTournament = createAsyncThunk<void, string>('tournaments/delete', async (id) => {
  await axiosApi.delete(`/tournaments/${id}`);
});

export const deleteTournamentsByYear = createAsyncThunk<void, string>('tournaments/deleteByYear', async (year) => {
  await axiosApi.delete(`/tournaments/one-year/${year}`);
});

export const updateTournament = createAsyncThunk<void, UpdateTournamentArg, { rejectValue: GlobalError }>(
  'tournaments/update',
  async ({ id, tournamentMutation }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(tournamentMutation) as (keyof TournamentMutation)[];
      keys.forEach((key) => {
        const value = tournamentMutation[key];
        if (value !== null) {
          formData.append(key, value);
        } else if (key === 'regulationsDoc') {
          formData.append(key, 'null');
        }
      });

      await axiosApi.put(`/tournaments/${id}`, formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);
