"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProviders, signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';

// Updated imports to use path aliases
import Meta from '@/components/Meta';
import AuthLayout from '@/layouts/AuthLayout';

// Define a type for the social providers
type SocialProvider = {
  id: string;
  name: string;
  type: string;
};

// Define a type for the structure of the providers object
type Providers = {
  [providerId: string]: SocialProvider;
};

// Dynamically import the Login component with SSR disabled
const Login = dynamic(() => import('@/components/Login'), { ssr: false });

export default function LoginPage() {
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [isSubmitting, setSubmittingState] = useState(false);
  const [socialProviders, setSocialProviders] = useState<SocialProvider[]>([]);

  const validate = isEmail(email);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const signInWithEmail = async (event) => {
    event.preventDefault();
    setSubmittingState(true);
    const response = await signIn('email', { email, redirect: false });

    if (response?.error === null) {
      toast.success(`Please check your email (${email}) for the login link.`, {
        duration: 5000,
      });
      setEmail('');
    }

    setSubmittingState(false);
  };

  const signInWithSocial = (socialId: string) => {
    signIn(socialId);
  };

  // Fetch the social providers on the client side
  useEffect(() => {
    (async () => {
      const providers: Providers = await getProviders() || {};
      // Filter out the email provider and set the social providers
      const socialProvidersList = Object.values(providers).filter(
        (provider) => provider.type !== 'email'
      );
      setSocialProviders(socialProvidersList);
    })();
  }, []);

  return (
    <AuthLayout>
      <Meta
        title="NextJS SaaS Boilerplate | Login"
        description="A boilerplate for your NextJS SaaS projects."
      />
      <Login
        email={email}
        handleEmailChange={handleEmailChange}
        signInWithEmail={signInWithEmail}
        signInWithSocial={signInWithSocial}
        socialProviders={socialProviders}
        status={status}
        validate={validate}
        isSubmitting={isSubmitting}
      />
    </AuthLayout>
  );
}
