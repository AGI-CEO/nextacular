import NextAuth from 'next-auth';
import { authOptions } from '@/lib/server/auth';

async function authHandler(req, res) {
  return await NextAuth(req, res, authOptions);
}

export default authHandler;
