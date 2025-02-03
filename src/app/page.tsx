'use client';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import Link from "next/link";
import ConnectWalletButton from '../../components/web3Wallet/ConnectWalletButton';

export default function Home() {
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      password: HTMLInputElement;
    };


    const credentials = {
      name: formElements.name.value,
      password: formElements.password.value
    };
    await login(credentials);
  };

  const handleConnect = (contractAddress: string): void => {
    //TODO: set the wallet address to the use context instead
    setWalletAddress(contractAddress);
    console.log(walletAddress, 'walletAddress')
  }

  return (
    <section className="min-h-screen bg-white flex">
      <div className="flex w-full max-w-7xl mx-auto">
        {/* Left Image Section Start */}
        <section className="hidden lg:flex w-1/2 bg-white justify-center items-center">
          <div className="relative w-full h-full max-w-md">
            <Image
              src="/hero.jpg"
              alt="Login illustration"
              priority
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </section>
        {/* Left Image Section End */}

        {/* Right Login Form Start */}
        <section className="flex-1 flex items-center justify-center p-8 sm:px-12 lg:px-16">
          <div className="w-full max-w-md space-y-8">
            {/* Header Start*/}
            <section className="text-center space-y-6">
              {/* Logo Section Start */}
              <div className="relative flex items-center justify-center gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Image
                      src="/logo.png"
                      alt="GOK Logo"
                      width={60}
                      height={60}
                      priority
                      className="object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-0 -right-1 h-full flex">
                      <div className="w-[1px] h-full bg-black"></div>
                      <div className="w-[1px] h-full bg-red-600"></div>
                      <div className="w-[1px] h-full bg-green-600"></div>
                    </div>
                  </div>
                  <p className="text-[20px] font-[800] text-gray-900">
                    Sentiment Analysis
                  </p>
                </div>
                <div className="flex h-12">
                  <div className="w-1 h-full bg-red-600"></div>
                  <div className="w-1 h-full bg-green-600"></div>
                  <div className="w-1 h-full bg-black"></div>
                </div>
              </div>
              {/* Logo Section End */}
              <div className="space-y-2">
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-sm text-gray-600">
                    Please sign in to submit your Sentiment
                  </p>

                </div>
              </div>
              {/* Decorative Line */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              </div>
            </section>
            {/* Header End*/}

            {/* Error Alert Start */}
            {error && (
              <section className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </section>
            )}
            {/* Error Alert End */}

            {/* Form Start*/}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    disabled={loading}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    minLength={6}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-7 w-7" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-7 w-7" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primaryRed hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? (
                    <div className="flex items-center text-nowrap">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
            {/* Form End*/}

            <div className="w-full w-full flex flex-row justify-center">
              {/*<Divider layout="horizontal" className="hidden md:flex">*/}
                <div>OR</div>
              {/*</Divider>*/}

            </div>

            <ConnectWalletButton onConnect={handleConnect} />

            {/* Forgot Password Links Start */}
            <section className="text-sm text-center flex flex-row space-x-2">
              <p>You Don&apos;t have an account?</p>
              <Link href="/Sign" className="font-medium text-blue-600 hover:text-blue-500">
                Sign Up
              </Link>
            </section>
            {/* Forgot Password Links End */}
          </div>
        </section>
        {/* Right Login Form End */}
      </div>
    </section>
  );
}