// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: any[];
}

const initialState: UiState = {
  sidebarCollapsed: localStorage.getItem('sidebar_collapsed') === 'true',
  theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('sidebar_collapsed', state.sidebarCollapsed.toString());
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    addNotification: (state, action: PayloadAction<any>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleSidebar,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;
export default uiSlice.reducer;