import { backendFetcher } from '@/lib/api/api_main';
import { GameInterface } from '@/types/game';
import useSWR from 'swr';

export const useGamesList = (): GameInterface[] | undefined => {
  const { data } = useSWR('/games/list', backendFetcher, {
    refreshInterval: 3000,
  });

  return data;
};

