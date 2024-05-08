import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';

type SocialProvider = {
  id: string;
  name: string;
  type: string;
};

interface LoginProps {
  email: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signInWithEmail: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  signInWithSocial: (socialId: string) => void;
  socialProviders: SocialProvider[];
  status: 'authenticated' | 'loading' | 'unauthenticated';
  validate: boolean;
  isSubmitting: boolean;
}

const Login: React.FC<LoginProps> = ({
  email,
  handleEmailChange,
  signInWithEmail,
  signInWithSocial,
  socialProviders,
  status,
  validate,
  isSubmitting,
}) => {
  useEffect(() => {
    // This effect is intentionally left blank for demonstration purposes
    // In a real application, this would fetch and set social providers
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3">
      <div>
        <Link href="/" className="text-4xl font-bold">
          Nextacular
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign in with your email</h1>
        <h2 className="text-gray-600">
          We&apos;ll send a magic link to your inbox to confirm your email
          address and sign you in.
        </h2>
      </div>
      <form className="flex flex-col w-full space-y-3">
        <input
          className="px-3 py-2 border rounded"
          onChange={handleEmailChange}
          placeholder="user@email.com"
          type="email"
          value={email}
        />
        <button
          className="py-2 text-white bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-75"
          disabled={status === 'loading' || !validate || isSubmitting}
          onClick={signInWithEmail}
        >
          {status === 'loading'
            ? 'Checking session...'
            : isSubmitting
            ? 'Sending the link...'
            : 'Send the Magic Link'}
        </button>
      </form>
      {socialProviders.length > 0 && (
        <>
          <span className="text-sm text-gray-400">or sign in with</span>
          <div className="flex flex-col w-full space-y-3">
            {socialProviders.map((provider) => (
              <button
                key={provider.id}
                className="py-2 bg-gray-100 border rounded hover:bg-gray-50 disabled:opacity-75"
                disabled={status === 'loading'}
                onClick={() => signInWithSocial(provider.id)}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
