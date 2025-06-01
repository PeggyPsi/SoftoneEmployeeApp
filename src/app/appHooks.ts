import { useDispatch } from 'react-redux';
import type { AppDispatch } from './appStore'; // adjust the path if needed

export const useAppDispatch = () => useDispatch<AppDispatch>();