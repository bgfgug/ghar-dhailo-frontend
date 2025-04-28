
import { useQuery } from '@tanstack/react-query';
import { festivalApi } from '@/services/api';

export function useFestivals() {
  return useQuery({
    queryKey: ['festivals'],
    queryFn: festivalApi.getAll
  });
}

export function useUpcomingFestivals() {
  return useQuery({
    queryKey: ['festivals', 'upcoming'],
    queryFn: festivalApi.getUpcoming
  });
}

export function useCurrentFestivals() {
  return useQuery({
    queryKey: ['festivals', 'current'],
    queryFn: festivalApi.getCurrent
  });
}
