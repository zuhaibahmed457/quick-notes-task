import {configureStore} from '@reduxjs/toolkit';

import appReducer from '../slices/appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    // [baseApi.reducerPath]: baseApi.reducer,
    // [thirdPartyApi.reducerPath]: thirdPartyApi.reducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(baseApi.middleware, thirdPartyApi.middleware),
});

export default store;
