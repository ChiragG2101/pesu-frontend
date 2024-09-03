import Cookies from "js-cookie";

// Define a type for the response data
type ApiResponse<T> = T;

// Get the base URL from the environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

// Function to make a GET request
export async function GET<T>(endpoint: string): Promise<ApiResponse<T>> {
  const token = Cookies.get("token");
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    console.error(`Error making GET request: ${error} `);
    throw error;
  }
}

// Function to make a POST request
export async function POST<T>(
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<ApiResponse<T>> {
  const token = Cookies.get("token");
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    console.error(`Error making POST request: ${error}`);
    throw error;
  }
}

// Function to make a PUT request
export async function PUT<T>(
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<ApiResponse<T>> {
  const token = Cookies.get("token");
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    console.error(`Error making PUT request: ${error}`);
    throw error;
  }
}
