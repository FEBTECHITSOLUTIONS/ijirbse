import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../../api/adminApi';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signinUser(form);
      
      localStorage.setItem('user', JSON.stringify(data.data));
      toast.success('Login successful!');
      setTimeout(() => {
        navigate(`${data.data.role}/editors`);
      }, 500);
    } catch (err) {
      toast.error(err?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
      <Toaster position="top-center" />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin / Editor Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <div className="p-3 bg-gray-100 text-gray-500">
              <FiMail />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 outline-none"
            />
          </div>

          {/* Password with show/hide */}
          <div className="flex items-center border rounded-lg overflow-hidden relative">
            <div className="p-3 bg-gray-100 text-gray-500">
              <FiLock />
            </div>
            <input
              type={showPassword ? 'text' : 'password'} // 👈 toggle
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 outline-none pr-10" // space for icon
            />
            <div
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} IJIRBSE — All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Signin;
