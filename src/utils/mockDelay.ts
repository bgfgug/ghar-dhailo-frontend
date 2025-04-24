
export const mockDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const mockApiCall = async <T>(data: T, delay: number = 500): Promise<T> => {
  await mockDelay(delay);
  return data;
};
