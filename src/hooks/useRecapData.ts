/**
 * React hook for fetching and managing recap data
 * Backend team: This hook is ready for AWS integration
 */

import { useState, useEffect } from 'react';
import { UserRecapData } from '@/types/recap';
import { getUserRecapData } from '@/services/recapDataService';

export const useRecapData = (userId: string, year: number = 2025) => {
  const [data, setData] = useState<UserRecapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const recapData = await getUserRecapData(userId, year);
        setData(recapData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch recap data'));
        console.error('Error fetching recap data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, year]);

  return { data, loading, error };
};
