
/**
 * Simulates an API delay
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export const mockDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Simulates an API call with a mock response
 * @param data Data to return after delay
 * @param delay Milliseconds to delay the response
 * @param shouldFail Optional flag to simulate API failure (10% chance if true)
 * @returns Promise that resolves with the data after the specified delay
 */
export const mockApiCall = async <T>(data: T, delay: number = 500, shouldFail: boolean = false): Promise<T> => {
  await mockDelay(delay);
  
  // Simulate random failures if shouldFail is true (10% chance)
  if (shouldFail && Math.random() < 0.1) {
    throw new Error('API request failed');
  }
  
  return data;
};

/**
 * Simulates API pagination
 * @param data Full array of data
 * @param page Page number (1-based)
 * @param pageSize Number of items per page
 * @param delay Milliseconds to delay
 * @returns Promise with paginated results and metadata
 */
export const mockPaginatedApiCall = async <T>(
  data: T[], 
  page: number = 1, 
  pageSize: number = 10, 
  delay: number = 500
) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);
  
  await mockDelay(delay);
  
  return {
    data: paginatedData,
    meta: {
      currentPage: page,
      pageSize,
      totalItems: data.length,
      totalPages
    }
  };
};
