import axios from "axios";

export const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle the error, e.g., log it or display a fallback data
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught by useSWR
  }
};
