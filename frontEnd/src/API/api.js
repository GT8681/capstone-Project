const BASE_URL='https://capstone-project-awft.onrender.com';
// API call function with token and content type
export const customFetch = async (endpoint ,options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json'}),
        ...(token && {'Authorization': `Bearer ${token}`}),
        ...options.headers
    };
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers : headers
    })
    return response;
}