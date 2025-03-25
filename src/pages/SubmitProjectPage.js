import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_BASE_URL from '../api/config';

const SubmitProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idea: '',
    description: '',
    public_key: '',
    teammate_names: '',
    github_link: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [hackathon, setHackathon] = useState(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/hackathons/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHackathon(response.data);

        if (response.data.status !== 'active') {
          toast.error('You can only submit to active hackathons');
          navigate(`/hackathons/${id}`);
        }
      } catch (err) {
        console.error('Fetch hackathon error:', err);
        toast.error('Failed to load hackathon details');
        navigate('/hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.idea) newErrors.idea = 'Idea is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.public_key) newErrors.public_key = 'Public key is required';
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
      await axios.post(
        `${API_BASE_URL}/api/hackathons/${id}/submit`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Project submitted successfully!');
      navigate(`/hackathons/${id}`);
    } catch (err) {
      console.error('Submit project error:', err);
      toast.error(err.response?.data?.error || 'Failed to submit project');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !hackathon) {
    return (
      <div className="text-center mt-6">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  if (!hackathon) return null;

  return (
    <div className="container mt-6">
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Submit Project for {hackathon.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">💡</span>
              Idea
            </label>
            <input
              type="text"
              name="idea"
              className={`form-control ${errors.idea ? 'is-invalid' : ''}`}
              value={formData.idea}
              onChange={handleChange}
            />
            {errors.idea && <div className="invalid-feedback">{errors.idea}</div>}
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
              <span className="icon-circle mr-2">🔑</span>
              Public Key
            </label>
            <input
              type="text"
              name="public_key"
              className={`form-control ${errors.public_key ? 'is-invalid' : ''}`}
              value={formData.public_key}
              onChange={handleChange}
            />
            {errors.public_key && <div className="invalid-feedback">{errors.public_key}</div>}
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">👥</span>
              Teammate Names (optional)
            </label>
            <input
              type="text"
              name="teammate_names"
              className="form-control"
              value={formData.teammate_names}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-secondary mb-2">
              <span className="icon-circle mr-2">🔗</span>
              GitHub Link (optional)
            </label>
            <input
              type="url"
              name="github_link"
              className="form-control"
              value={formData.github_link}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Submit Project'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProjectPage;