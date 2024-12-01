import React from 'react';

const Profile = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Hồ sơ của tôi</h2>
      <div>
        <p className="text-lg mb-2">Tên: John Doe</p>
        <p className="text-lg mb-2">Email: johndoe@example.com</p>
        <p className="text-lg mb-2">Số điện thoại: 123456789</p>
      </div>
    </div>
  );
};

export default Profile;
