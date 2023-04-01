import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: []
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUers: (state, action) => {
      return {
        users: [...state.users, action.payload]
      };
    },
    updateUsers: (state, action) => {
      const updateUser = state.users.map((d) => {
        if (d.id === action.payload.id) {
          return { ...d, username: action.payload.username };
        }
        return d;
      });
      return {
        users: updateUser
      };
    },
    deleteUsers: (state, action) => {
      const restUsers = state.users.filter((d) => d.id !== action.payload);
      return {
        users: restUsers
      };
    }
  }
});

export const { addUers, updateUsers, deleteUsers } = usersSlice.actions;

export default usersSlice.reducer;
