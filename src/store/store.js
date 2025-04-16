import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import { getLocalItem, isNullOrEmpty, setLocalItem } from '../utils/utils';

const loadFromLocalStorage = () => {
  try {
    const serializedState = getLocalItem('userState');
    if (isNullOrEmpty(serializedState)) return undefined;
    return { user: serializedState };
  } catch (e) {
    console.warn('Could not load user state', e);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    setLocalItem('userState', state.user);
  } catch (e) {
    console.warn('Could not save user state', e);
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export { store };
