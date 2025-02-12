import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateInputs()) return;

    const data = { username, email, password };
    try {
      await registerUser(data).unwrap();
      alert('Registration Successful!');
      navigate('/login');
    } catch (error) {
      setMessage(error?.data?.message || 'Registration Failed');
    }
  };

  return (
    <section className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Please Register</h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className={`w-full bg-gray-100 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md transition duration-300`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full bg-gray-100 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md transition duration-300`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full bg-gray-100 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary px-5 py-3 rounded-md transition duration-300`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {message && <p className="text-red-500 text-sm text-center">{message}</p>}

          <button
            type="submit"
            className={`w-full mt-5 ${
              isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary'
            } text-white hover:bg-primary-dark font-medium py-3 rounded-md transition duration-300`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="my-5 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:text-primary-dark">
            Login here.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
