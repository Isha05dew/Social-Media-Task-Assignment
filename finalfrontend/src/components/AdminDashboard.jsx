import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {users.map((user, index) => (
        <div key={index}>
          <p>Name: {user.name}</p>
          <p>Social Media Handle: {user.socialMediaHandle}</p>
          <div>
            {user.images.map((image, idx) => (
              <a
                key={idx}
                href={`http://localhost:5000/${image}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`http://localhost:5000/${image}`}
                  alt={`User ${index + 1} - Image ${idx + 1}`}
                  width="100"
                />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
