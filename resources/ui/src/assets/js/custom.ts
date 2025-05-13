
import { fetchAuthSession } from "aws-amplify/auth";

export async function getIdToken() {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString();
  }

export async function getAccessToken() {
    const session = await fetchAuthSession();
    return session.tokens?.accessToken?.toString();
} 

async function getHeaders() {

  return {
    Authorization: `Bearer ${await getAccessToken()}`,
    "Content-Type": "application/json",
  };
}

export async function callAPI(resource: string, method: string = "GET", body: any = null): Promise<any> {
  const result = await fetch("/aws-exports.json");
  const awsExports = await result.json();

  const url = `${awsExports.domainName}/${resource}`;
  const headers = await getHeaders();
  
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function callStreamingAPI(resource: string, method: string = "GET", body: any = null): Promise<any> {
  try {
    const result = await fetch("/aws-exports.json");
    const awsExports = await result.json();
    const url = `${awsExports.domainName}/${resource}`;

    const headers = await getHeaders();
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      // Try to parse error as JSON
      try {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || `HTTP error ${response.status}: ${response.statusText}`);
      } catch (jsonError) {
        // If parsing fails, throw the original error
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
    }

    // Return the response directly - no need to create a new one
    return response;
  } catch (error) {
    console.error("Error in callStreamingAPI:", error);
    throw error;
  }
}
