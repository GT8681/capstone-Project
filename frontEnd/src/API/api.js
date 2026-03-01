const BASE_URL = import.meta.env.VITE_API_URL || 'https://capstone-project-awft.onrender.com';

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