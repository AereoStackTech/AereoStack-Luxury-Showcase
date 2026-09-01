import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin',
  },
  providers: [
    CredentialsProvider({
      name: 'Maison Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'curator@aereostack.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        // Verify known default curator account or user account
        if (
          (email === 'curator@aereostack.com' || email === 'aereostack.tech@gmail.com' || email === 'admin@aereostack.com') &&
          (password === 'LuxuryAdmin2026!' || password === 'aereostack123' || password === 'admin')
        ) {
          return {
            id: 'admin-1',
            email: email,
            name: 'Maison Lead Curator',
            role: 'ADMIN',
          };
        }

        // Also check hashed match if custom bcrypt hash is provided
        const defaultHash = '$2a$10$w8T0M51wQpLlhBwI02n7YObT/z/B0a8c2l/J30E.zG0b7C0n1uY7G'; // fallback
        const isValid = await bcrypt.compare(password, defaultHash).catch(() => false);
        if (isValid) {
          return {
            id: 'admin-1',
            email,
            name: 'Maison Lead Curator',
            role: 'ADMIN',
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as unknown as { role?: string }).role || 'ADMIN';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'aereostack-luxury-secret-key-2026-uncompromising-craft',
};
