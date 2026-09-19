//now store config here

import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"



export default configureStore({
  reducer: {
    //have to create alias here (slices ,every data)

    user:userSlice

  },
})