// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  hasMore: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
  hasMore: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Array<{ id: number; name: string; email: string }>>) {
      state.users = action.payload;
      state.hasMore = true; // Reset hasMore when setting users
    },
    appendUsers(state, action: PayloadAction<Array<{ id: number; name: string; email: string }>>) {
      state.users = [...state.users, ...action.payload];
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      // Action to update hasMore
      state.hasMore = action.payload;
    },
    updateUser(state, action: PayloadAction<{ id: number; updates: Partial<User> }>) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.updates };
      }
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
  },
});

export const { setLoading, setHasMore, setUsers, appendUsers, deleteUser, updateUser, addUser } = userSlice.actions;
export default userSlice.reducer;
