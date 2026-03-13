
import React, { useState } from 'react';
import ShieldIcon from './icons/ShieldIcon';
import ViewIcon from './icons/ViewIcon';
import EyeOffIcon from './icons/EyeOffIcon';

interface ClientLoginPageProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onBack: () => void;
  onGoToRegister: () => void;
  onForgotPassword: () => void;
}

const ClientLoginPage: React.FC<ClientLoginPageProps> = ({ onLogin, onBack, onGoToRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed auth-bg">
      <div className="absolute inset-0 bg-slate-100/70"></div>
      <div className="relative w-full max-w-sm p-8 space-y-6 bg-white/90 rounded-lg shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center">
            <div className="bg-slate-200 p-3 rounded-full mb-3">
                <ShieldIcon className="w-8 h-8 text-slate-700" />
            </div>
            <h1 className="text-2xl font-bold text-center text-slate-900">Client Access Portal</h1>
        </div>
        <h2 className="text-xl font-semibold text-center text-slate-700">Client Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-600"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client.email@example.com"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-600"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword(); }} className="font-medium text-blue-600 hover:text-blue-800">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword 
                    ? <EyeOffIcon className="h-5 w-5 text-slate-500" /> 
                    : <ViewIcon className="h-5 w-5 text-slate-500" />
                }
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400"
            >
              {isLoading ? 'Logging in...' : 'Secure Login'}
            </button>
          </div>
        </form>
         <div className="text-sm text-center">
            <p className="text-slate-500">
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); onGoToRegister(); }} className="font-medium text-blue-600 hover:text-blue-800">
                    Sign up
                </a>
            </p>
        </div>
        <div className="text-sm text-center border-t border-slate-200 pt-4">
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="font-medium text-slate-500 hover:text-slate-700 text-xs">
                &larr; Back to Portal Selection
            </a>
        </div>
      </div>
    </div>
  );
};

export default ClientLoginPage;
