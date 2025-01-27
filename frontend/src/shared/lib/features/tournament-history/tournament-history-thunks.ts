import { Filters } from '@/shared/types/root.types';
import { TournamentHistoryResponse } from '@/shared/types/tournament-history.types';
import { GlobalError } from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { axiosApi } from '../..';
import { toQueryParams } from '../../to-query-params';

export const fetchTournamentHistory = createAsyncThunk<
  TournamentHistoryResponse,
  Filters | undefined,
  { rejectValue: GlobalError }
>('tournamentHistory/fetchTournamentHistory', async (data, { rejectWithValue }) => {
  let query = '';
  try {
    if (data?.query) {
      query = toQueryParams(data.query);
    }
    const { data: response } = await axiosApi.get<TournamentHistoryResponse>(`/tournamentHistory${query}`);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 404) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});
