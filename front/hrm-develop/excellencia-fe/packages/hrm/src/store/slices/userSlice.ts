// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  profile: any | null;
  preferences: any | null;
  onboardingCompleted: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  preferences: null,
  onboardingCompleted: localStorage.getItem('onboarding_completed') === 'true',
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePreferences: (state, action: PayloadAction<any>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
      localStorage.setItem('onboarding_completed', 'true');
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updatePreferences,
  completeOnboarding,
} = userSlice.actions;
export default userSlice.reducer;