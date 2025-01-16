import {
  createMainLogo,
  createMenuPosition,
  createSocialNetwork,
  deleteMenuPosition,
  deleteOneSocialNetwork,
  fetchCurrentLogo,
  fetchDeleteLogo,
  getFooterItems,
  getOneMenuPosition,
  getOneSocialNetwork,
  updateMainPartnerImage,
  updateMenuPosition,
  updatePublicOffer,
  updateSocialNetwork,
} from '@/shared/lib/features/footer/footers-thunks';
import { FooterElementsData, MainLogo, MenuOnePositionField, SocialOneNetworkField } from '@/shared/types/footer.types';
import { GlobalError } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

interface FootersState {
  itemsData: FooterElementsData[];
  oneSocialLink: SocialOneNetworkField | null;
  menuPositionLink: MenuOnePositionField | null;
  itemsFetching: boolean;
  oneItemFetching: boolean;
  itemCreating: boolean;
  itemDeleting: string | null;
  itemUpdating: boolean;
  logo: MainLogo | null;
  logoLoading: boolean;
  logoError: GlobalError | null;
  currentLogo: string | null;
}

const initialState: FootersState = {
  itemsData: [],
  oneSocialLink: null,
  menuPositionLink: null,
  itemsFetching: false,
  oneItemFetching: false,
  itemCreating: false,
  itemDeleting: null,
  itemUpdating: false,
  logo: null,
  logoLoading: false,
  logoError: null,
  currentLogo: null,
};

export const footersSlice = createSlice({
  name: 'footers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFooterItems.pending, (state) => {
      state.itemsFetching = true;
    });
    builder.addCase(getFooterItems.fulfilled, (state, { payload: data }) => {
      state.itemsFetching = false;
      state.itemsData = data;
    });
    builder.addCase(getFooterItems.rejected, (state) => {
      state.itemsFetching = false;
    });

    builder.addCase(getOneSocialNetwork.pending, (state) => {
      state.oneItemFetching = true;
    });
    builder.addCase(getOneSocialNetwork.fulfilled, (state, { payload: data }) => {
      state.oneItemFetching = false;
      state.oneSocialLink = data;
    });
    builder.addCase(getOneSocialNetwork.rejected, (state) => {
      state.oneItemFetching = false;
    });

    builder.addCase(createSocialNetwork.pending, (state) => {
      state.itemCreating = true;
    });
    builder.addCase(createSocialNetwork.fulfilled, (state) => {
      state.itemCreating = false;
    });
    builder.addCase(createSocialNetwork.rejected, (state) => {
      state.itemCreating = false;
    });

    builder.addCase(updateSocialNetwork.pending, (state) => {
      state.itemUpdating = true;
    });
    builder.addCase(updateSocialNetwork.fulfilled, (state) => {
      state.itemUpdating = false;
    });
    builder.addCase(updateSocialNetwork.rejected, (state) => {
      state.itemUpdating = false;
    });

    builder.addCase(deleteOneSocialNetwork.pending, (state, { meta }) => {
      state.itemDeleting = meta.arg;
    });
    builder.addCase(deleteOneSocialNetwork.fulfilled, (state, { meta }) => {
      state.itemsData[0].socialNetwork = state.itemsData[0].socialNetwork.filter((rank) => rank._id !== meta.arg);
      state.itemDeleting = null;
    });
    builder.addCase(deleteOneSocialNetwork.rejected, (state) => {
      state.itemDeleting = null;
    });

    builder.addCase(getOneMenuPosition.pending, (state) => {
      state.oneItemFetching = true;
    });
    builder.addCase(getOneMenuPosition.fulfilled, (state, { payload: data }) => {
      state.oneItemFetching = false;
      state.menuPositionLink = data;
    });
    builder.addCase(getOneMenuPosition.rejected, (state) => {
      state.oneItemFetching = false;
    });

    builder.addCase(createMenuPosition.pending, (state) => {
      state.itemCreating = true;
    });
    builder.addCase(createMenuPosition.fulfilled, (state) => {
      state.itemCreating = false;
    });
    builder.addCase(createMenuPosition.rejected, (state) => {
      state.itemCreating = false;
    });

    builder.addCase(updateMenuPosition.pending, (state) => {
      state.itemUpdating = true;
    });
    builder.addCase(updateMenuPosition.fulfilled, (state) => {
      state.itemUpdating = false;
    });
    builder.addCase(updateMenuPosition.rejected, (state) => {
      state.itemUpdating = false;
    });

    builder.addCase(deleteMenuPosition.pending, (state, { meta }) => {
      state.itemDeleting = meta.arg;
    });
    builder.addCase(deleteMenuPosition.fulfilled, (state, { meta }) => {
      state.itemsData[0].menuPosition = state.itemsData[0].menuPosition.filter((rank) => rank._id !== meta.arg);
      state.itemDeleting = null;
    });
    builder.addCase(deleteMenuPosition.rejected, (state) => {
      state.itemDeleting = null;
    });

    builder.addCase(updatePublicOffer.pending, (state) => {
      state.itemUpdating = true;
    });
    builder.addCase(updatePublicOffer.fulfilled, (state) => {
      state.itemUpdating = false;
    });
    builder.addCase(updatePublicOffer.rejected, (state) => {
      state.itemUpdating = false;
    });

    builder.addCase(updateMainPartnerImage.pending, (state) => {
      state.itemUpdating = true;
    });
    builder.addCase(updateMainPartnerImage.fulfilled, (state) => {
      state.itemUpdating = false;
    });
    builder.addCase(updateMainPartnerImage.rejected, (state) => {
      state.itemUpdating = false;
    });

    builder.addCase(createMainLogo.pending, (state) => {
      state.logoLoading = true;
      state.logoError = null;
    });
    builder.addCase(createMainLogo.fulfilled, (state) => {
      state.logoLoading = false;
    });
    builder.addCase(createMainLogo.rejected, (state) => {
      state.logoLoading = false;
      state.logoError = null;
    });

    builder.addCase(fetchCurrentLogo.pending, (state) => {
      state.logoLoading = true;
      state.logoError = null;
    });
    builder.addCase(fetchCurrentLogo.fulfilled, (state, { payload: logoId }) => {
      state.logoLoading = false;
      state.currentLogo = logoId;
    });
    builder.addCase(fetchCurrentLogo.rejected, (state) => {
      state.logoLoading = false;
      state.logoError = null;
    });

    builder.addCase(fetchDeleteLogo.pending, (state) => {
      state.logoLoading = true;
      state.logoError = null;
    });
    builder.addCase(fetchDeleteLogo.fulfilled, (state) => {
      state.logoLoading = false;
      state.logoError = null;
    });
    builder.addCase(fetchDeleteLogo.rejected, (state, { payload: error }) => {
      state.logoLoading = false;
      state.logoError = error || null;
    });
  },
  selectors: {
    selectItemsData: (state) => state.itemsData,
    selectOneSocialLink: (state) => state.oneSocialLink,
    selectMenuPositionLink: (state) => state.menuPositionLink,
    selectItemsFetching: (state) => state.itemsFetching,
    selectItemCreating: (state) => state.itemCreating,
    selectItemDeleting: (state) => state.itemDeleting,
    selectItemUpdating: (state) => state.itemUpdating,
    selectMainLogoLoading: (state) => state.logoLoading,
    selectCurrentLogo: (state) => state.currentLogo,
    selectErrorLogo: (state) => state.logoError,
  },
});

export const footersReducer = footersSlice.reducer;
export const {
  selectItemsData,
  selectOneSocialLink,
  selectMenuPositionLink,
  selectItemsFetching,
  selectItemCreating,
  selectItemDeleting,
  selectItemUpdating,
  selectMainLogoLoading,
  selectCurrentLogo,
  selectErrorLogo,
} = footersSlice.selectors;
