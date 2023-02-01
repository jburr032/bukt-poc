import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  publicKey: '',
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    publicKeyState: (state, action) => ({
      ...state,
      publicKey: action.payload,
    }),
  },
});

export const userDataActions = userDataSlice.actions;

export const selectPublicKey = state => state.userData.publicKey;

export default userDataSlice.reducer;
