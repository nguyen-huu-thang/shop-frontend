import React, { useState } from 'react';
import userApi from '../../../api/userApi';

const GetUserById = () => {
  const [id, setId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await userApi.getUserById(id);
      setUser(data);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(`Failed to fetch user: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Get User</button>
      </form>
      {error && <p>{error}</p>}
      {user && <p>{user.username} ({user.email})</p>}
    </div>
  );
};

export default GetUserById;
