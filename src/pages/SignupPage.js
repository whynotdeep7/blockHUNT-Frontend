import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!['user', 'organizer'].includes(formData.role)) newErrors.role = 'Invalid role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/signup', formData, { timeout: 5000 });
      toast.success(response.data.message);
      navigate('/login');
    } catch (err) {
      const errorMessage = err.code === 'ECONNABORTED' ? 'Request timed out.' : err.response?.data?.error || 'Signup failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2"><Mail className="h-4 w-4 mr-2" /> Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2"><Lock className="h-4 w-4 mr-2" /> Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2"><User className="h-4 w-4 mr-2" /> Role</label>
            <select
              name="role"
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:text-primary">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;