const BASE_URL = 'http://localhost:4545';

export const customFetch = async (endpoint ,options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && {'Authorization': `Bearer ${token}`}),
        ...options.headers
    };
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers : headers
    })
    return response;
}