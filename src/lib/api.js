import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
});

export async function register(payload) {
  try {
    // In a real app, this would call the backend
    // const { data } = await api.post('/auth/register', payload);
    // return data;
    await new Promise((r) => setTimeout(r, 500));
    return { token: 'mock-jwt-token' };
  } catch (e) {
    throw e;
  }
}

export async function login(payload) {
  try {
    // const { data } = await api.post('/auth/login', payload);
    // return data;
    await new Promise((r) => setTimeout(r, 500));
    return { token: 'mock-jwt-token', username: 'Baker' };
  } catch (e) {
    throw e;
  }
}

export async function checkout(payload) {
  try {
    // const { data } = await api.post('/checkout', payload);
    // return data;
    await new Promise((r) => setTimeout(r, 800));
    return { status: 'ok' };
  } catch (e) {
    throw e;
  }
}
