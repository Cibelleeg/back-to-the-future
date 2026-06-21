export const config = {
  apiUrl: import.meta.env.VITE_API_URL as string,
  useMock: import.meta.env.VITE_USE_MOCK !== 'false',
} as const;
