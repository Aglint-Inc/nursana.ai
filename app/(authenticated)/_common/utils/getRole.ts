import { cache } from 'react';
import { api } from 'trpc/server';

export const getRole = cache(async () => await api.authenticated.role());
