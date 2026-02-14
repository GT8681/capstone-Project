const BASE_URL = 'http://localhost:4545';

export const customFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            ...options,
            headers,
        });
        console.log('Request Headers:', headers);
        console.log('Response Status:', response);
       
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.message || 'Credenziali sbagliate');
    }
    return await response.json();
   
}