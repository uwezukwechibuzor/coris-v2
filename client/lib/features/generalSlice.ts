import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  sidebarToggled: boolean;
  connectWalletModalToggled: boolean;
  darkMode: boolean;
  chain: {
    name: string;
    image: string;
    id;
  };
} = {
  sidebarToggled: false,
  connectWalletModalToggled: false,
  darkMode: true,
  chain: {
    name: "COSMOS",
    id: "COSMOS",
    image: "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1555657960",
  },
};

/**
 * @name generalSlice
 * @description
 */
export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.sidebarToggled = action.payload;
    },
    toggleConnectWalletModal(state, action) {
      state.connectWalletModalToggled = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setChain(state, action) {
      state.chain = { ...action.payload };
    },
  },
});

// eslint-disable-next-line
export const {
  toggleSidebar,
  toggleConnectWalletModal,
  toggleDarkMode,
  setChain,
} = generalSlice.actions;
export default generalSlice.reducer;

