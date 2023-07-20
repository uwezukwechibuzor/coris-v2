const REFRESH_INTERVAL = 5000; // Refresh data every 5 seconds

export const swrOptions = {
  refreshInterval: REFRESH_INTERVAL, // Revalidate data every 5 seconds
  dedupingInterval: REFRESH_INTERVAL, // Dedupe requests during the same interval
  refreshWhenHidden: true,
  refreshWhenOffline: true,
  revalidateOnFocus: true,
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (retryCount < 3) {
      // Retry up to 3 times on error
      setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 1000);
    }
  },
};
