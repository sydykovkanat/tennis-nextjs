import { RootState } from '@/shared/hooks/hooks';
import { axiosApi } from '@/shared/lib';
import {
  FooterElementsData,
  LinkDataMutation,
  MainLogoMutation,
  MenuOnePositionField,
  SocialOneNetworkField,
} from '@/shared/types/footer.types';
import { GlobalError } from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const getFooterItems = createAsyncThunk<FooterElementsData[], void, { state: RootState }>(
  'footers/getFooterItems',
  async () => {
    const { data: footerItemsData } = await axiosApi.get<FooterElementsData[]>('/footers');
    return footerItemsData;
  },
);

export const getOneSocialNetwork = createAsyncThunk<SocialOneNetworkField, string, { state: RootState }>(
  'footers/getOneSocialNetwork',
  async (id) => {
    const { data: oneSocialNetwork } = await axiosApi.get<SocialOneNetworkField>(
      `/footers/get-one-social-network/${id}`,
    );
    return oneSocialNetwork;
  },
);

export const createSocialNetwork = createAsyncThunk<void, LinkDataMutation, { state: RootState }>(
  'footers/createSocialNetwork',
  async (data) => {
    await axiosApi.post<LinkDataMutation>('/footers/create-social-network', data);
  },
);

export const updateSocialNetwork = createAsyncThunk<void, { id: string; data: LinkDataMutation }, { state: RootState }>(
  'footers/updateSocialNetwork',
  async ({ id, data }) => {
    await axiosApi.patch(`footers/update-social-network/${id}`, data);
  },
);

export const deleteOneSocialNetwork = createAsyncThunk<void, string, { state: RootState }>(
  'footers/deleteOneSocialNetwork',
  async (id) => {
    await axiosApi.delete(`footers/delete-one-social-network/${id}`);
  },
);

export const getOneMenuPosition = createAsyncThunk<MenuOnePositionField, string, { state: RootState }>(
  'footers/getOneMenuPosition',
  async (id) => {
    const { data: getOneMenuPosition } = await axiosApi.get<MenuOnePositionField>(
      `/footers/get-one-menu-position/${id}`,
    );
    return getOneMenuPosition;
  },
);

export const createMenuPosition = createAsyncThunk<void, LinkDataMutation, { state: RootState }>(
  'footers/createMenuPosition',
  async (data) => {
    await axiosApi.post<LinkDataMutation>('/footers/create-menu-position', data);
  },
);

export const updateMenuPosition = createAsyncThunk<void, { id: string; data: LinkDataMutation }, { state: RootState }>(
  'footers/updateMenuPosition',
  async ({ id, data }) => {
    await axiosApi.patch(`footers/update-menu-position/${id}`, data);
  },
);

export const deleteMenuPosition = createAsyncThunk<void, string, { state: RootState }>(
  'footers/deleteMenuPosition',
  async (id) => {
    await axiosApi.delete(`footers/delete-menu-position/${id}`);
  },
);

export const updatePublicOffer = createAsyncThunk<void, { publicOfferLink: string }, { state: RootState }>(
  'footers/updatePublicOffer',
  async ({ publicOfferLink }) => {
    await axiosApi.patch('footers/update-public-offer', { publicOfferLink });
  },
);

export const updateMainPartnerImage = createAsyncThunk<void, { mainPartnerImageLink: string }, { state: RootState }>(
  'footers/updateMainPartnerImage',
  async ({ mainPartnerImageLink }) => {
    const formData = new FormData();
    if (mainPartnerImageLink) {
      formData.append('mainPartnerImage', mainPartnerImageLink);
    }

    await axiosApi.patch('footers/update-main-partner-image', formData);
  },
);

export const createMainLogo = createAsyncThunk(
  'footers/createMainLogo',
  async (newLogo: MainLogoMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (newLogo.logo) {
        formData.append('logo', newLogo.logo);
      }

      await axiosApi.post('footers/create-main-logo', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const postCurrentLogo = createAsyncThunk('footers/postCurrentLogo', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('footers/set-current-logo', { logoId: id });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }
    if (isAxiosError(error) && error.response && error.response.status === 401) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const fetchCurrentLogo = createAsyncThunk('logo/fetchCurrentLogo', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('footers/get-current-logo');
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }
    if (isAxiosError(error) && error.response && error.response.status === 401) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const fetchDeleteLogo = createAsyncThunk<void, { id: string }, { rejectValue: GlobalError }>(
  'logo/fetchDeleteLogo',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`footers/delete-logo/${id}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);
