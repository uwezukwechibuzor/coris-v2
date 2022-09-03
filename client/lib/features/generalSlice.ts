import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  sidebarToggled: boolean;
  connectWalletModalToggled: boolean;
  darkMode: boolean;
} = {
  sidebarToggled: false,
  connectWalletModalToggled: false,
  darkMode: false,
};

/**
 * @name generalSlice
 * @description
 */
export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        toggleSidebar(state, action) {
            state.sidebarToggled = action.payload
        },
        toggleConnectWalletModal(state, action) {
            state.connectWalletModalToggled = action.payload
      },
        toggleDarkMode(state){
          state.darkMode = !state.darkMode
        }
    },
})

// eslint-disable-next-line
export const { toggleSidebar, toggleConnectWalletModal, toggleDarkMode} = generalSlice.actions;
export default generalSlice.reducer
