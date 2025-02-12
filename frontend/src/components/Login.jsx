import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice'; // Adjust based on your path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // For dispatching actions
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Both email and password are required.');
      return;
    }

    try {
      const response = await loginUser({ email, password }).unwrap();
      const { token, user } = response;
      dispatch(setUser({user}));
      alert("Login Successful");
      navigate('/'); // Redirect to the homepage or dashboard
    } catch (error) {
      console.error('Login Error:', error);
      setMessage(
        error?.data?.message || 'Invalid credentials. Please try again.'
      );
    }
  };

  return (
    <section className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md transition duration-300"
            />
          </div>

          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark font-medium py-3 rounded-md transition duration-300"
          >
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="my-5 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary font-medium hover:text-primary-dark"
          >
            Register here.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
