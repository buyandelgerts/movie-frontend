export const getStoredToken = (): string | null => {
    return localStorage.getItem('user_jwt_token');
  };
  
  export const saveToken = (token: string): void => {
    localStorage.setItem('user_jwt_token', token);
  };
  
  export const clearToken = (): void => {
    localStorage.removeItem('user_jwt_token');
  };
  
  export const getAccessToken = async (apiUrl: string): Promise<string> => {
    const response = await fetch(apiUrl+'/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: import.meta.env.VITE_API_BASE_USERNAME,
        password: import.meta.env.VITE_API_BASE_PASSWORD,
      }),
      // credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.status}`);
    }
  
    const data = await response.json();
  
    if (!data.accessToken) {
      throw new Error('Token not found in response');
    }
  
    saveToken(data.accessToken);
  
    return data.accessToken;
  };