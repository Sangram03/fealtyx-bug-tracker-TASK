import { useAuthStore } from '../store/authStore';
import { mockUsers } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      login(user);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
