// hooks/useGamesList.ts
import useSWR from 'swr';
import {GameInterface } from '@/types/game';

export function useGamesList() {
  const { data, error } = useSWR<GameInterface[]>('/api/games');

  return {
    data,
    isLoading: !error && !data,
    error
  }
}

