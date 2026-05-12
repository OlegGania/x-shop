import axios, { InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
import { supabase } from './supabaseClient';

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_SUPABASE_URL + '/rest/v1',
  headers: {
    apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'count=exact',
  },
});

axiosService.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = new AxiosHeaders(config.headers);
  }

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    config.headers.delete('Authorization');
  }

  return config;
});

export default axiosService;
