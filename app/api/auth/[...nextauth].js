import NextAuth from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import prisma from '@/prisma/index';
import { emailConfig, sendMail } from '@/lib/server/mail';
import { html, text } from '@/config/email-templates/signin';
import { createPaymentAccount, getPayment } from '@/prisma/services/customer';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: emailConfig,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { host } = new URL(url);
        await sendMail({
          to: email,
          subject: `[Nextacular] Sign in to ${host}`,
          html: html({ email, url }),
          text: text({ email, url }),
        });
      },
    }),
    // ...add more providers here if necessary
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        const customerPayment = await getPayment(user.email);
        session.user.userId = user.id;
        if (customerPayment) {
          session.user.subscription = customerPayment.subscriptionType;
        }
      }
      return session;
    },
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      const customerPayment = await getPayment(user.email);
      if (isNewUser || customerPayment === null || user.createdAt === null) {
        await createPaymentAccount(user.email, user.id);
      }
    },
  },
  // Enable debug messages in the console if not in production
  debug: process.env.NODE_ENV !== 'production',
  // Secret used by NextAuth for encryption (should be set in .env)
  secret: process.env.NEXTAUTH_SECRET,
  // Enable JSON Web Tokens for session management
  session: {
    jwt: true,
  },
});
