import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import prisma from '@/prisma/index';
import { html, text } from '@/config/email-templates/signin';
import { emailConfig, sendMail } from '@/lib/server/mail';
import { createPaymentAccount, getPayment } from '@/prisma/services/customer';

// Define authOptions with the correct types and structure for NextAuth
const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      // Enrich the session object with user details and subscription information
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
  debug: !(process.env.NODE_ENV === 'production'),
  events: {
    signIn: async ({ user, account, isNewUser }) => {
      // Create a payment account for new users or users without payment information
      const customerPayment = await getPayment(user.email);

      if (isNewUser || customerPayment === null || user.createdAt === null) {
        await createPaymentAccount(user.email, user.id);
      }
    },
  },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: emailConfig,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        // Send a sign-in email with a verification link
        const { host } = new URL(url);
        await sendMail({
          from: process.env.EMAIL_FROM,
          html: html({ email, url }),
          subject: `[Nextacular] Sign in to ${host}`,
          text: text({ email, url }),
          to: email,
        });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Correct the strategy type to match the expected type for SessionOptions
    strategy: 'jwt' as const,
  },
};

export default NextAuth({
  adapter: authOptions.adapter,
  callbacks: authOptions.callbacks,
  debug: authOptions.debug,
  events: authOptions.events,
  providers: authOptions.providers,
  secret: authOptions.secret,
  session: authOptions.session,
});
