import { useContext } from 'react';
import { TrendingSongsContext } from './TrendingSongsContext';

export const useTrendingSongs = () => {
    return useContext(TrendingSongsContext);
};