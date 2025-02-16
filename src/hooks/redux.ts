import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, AppStoreType } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
