import { useState } from 'react';

// PASTIKAN ADA KATA 'export' DI SINI:
export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (requestFunc: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    try {
      await requestFunc();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gagal terhubung ke server';
      setError(msg);
      console.error("Error Detail:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleRequest };
};