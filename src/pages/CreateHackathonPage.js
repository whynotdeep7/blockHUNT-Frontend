import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateHackathonPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    prize_pool: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.start_date) newErrors.start_date = 'Start date is required';
    if (!formData.end_date) newErrors.end_date = 'End date is required';
    if (!formData.prize_pool) newErrors.prize_pool = 'Prize pool is required';
    else if (parseFloat(formData.prize_pool) <= 0) newErrors.prize_pool = 'Prize pool must be a positive number';

    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);
    const now = new Date();

    if (formData.start_date && startDate < now) {
      newErrors.start_date = 'Start date must be in the future';
    }
    if (formData.start_date && formData.end_date && endDate <= startDate) {
      newErrors.end_date = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/hackathons',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      navigate('/organizer-hackathons');
    } catch (err) {
      console.error('Create hackathon error:', err);
      toast.error(err.response?.data?.error || 'Failed to create hackathon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-6">
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Create Hackathon</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">🏆</span>
              Title
            </label>
            <input
              type="text"
              name="title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">📝</span>
              Description
            </label>
            <textarea
              name="description"
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">📅</span>
              Start Date
            </label>
            <input
              type="datetime-local"
              name="start_date"
              className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
              value={formData.start_date}
              onChange={handleChange}
            />
            {errors.start_date && <div className="invalid-feedback">{errors.start_date}</div>}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">📅</span>
              End Date
            </label>
            <input
              type="datetime-local"
              name="end_date"
              className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
              value={formData.end_date}
              onChange={handleChange}
            />
            {errors.end_date && <div className="invalid-feedback">{errors.end_date}</div>}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">💰</span>
              Prize Pool (ETH)
            </label>
            <input
              type="number"
              name="prize_pool"
              className={`form-control ${errors.prize_pool ? 'is-invalid' : ''}`}
              value={formData.prize_pool}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
            {errors.prize_pool && <div className="invalid-feedback">{errors.prize_pool}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Create Hackathon'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathonPage;