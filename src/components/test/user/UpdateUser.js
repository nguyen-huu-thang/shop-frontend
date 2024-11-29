import React, { useState } from 'react';
import userApi from '../../../api/userApi';

const UpdateUser = () => {
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userApi.updateUser(id, formData);
      setMessage(`User "${updatedUser.username}" updated successfully!`);
    } catch (error) {
      setMessage(`Failed to update user: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User ID:</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Update User</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateUser;
