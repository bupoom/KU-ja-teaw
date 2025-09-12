import * as SecureStore from 'expo-secure-store';
import client from './client';

async function saveTokens(access_token: string, refresh_token: string) {
  await SecureStore.setItemAsync('access_token', access_token);
  await SecureStore.setItemAsync('refresh_token', refresh_token);
}

async function callProtectedApi() {
  const token = await SecureStore.getItemAsync('access_token');
  const res = await client.get('/api/trips/by-trip/123', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// เมื่อ access_token หมดอายุ
async function refreshAccessToken() {
  const refreshToken = await SecureStore.getItemAsync('refresh_token');
  const res = await client.post('/api/refresh-token', { refresh_token: refreshToken });
  await SecureStore.setItemAsync('access_token', res.data.access_token);
}
