import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai"; // Delete Icon
import { FaRegEdit } from "react-icons/fa"; // Edit Icon
import { IoIosAddCircle } from "react-icons/io"; // Add User Icon
// import User from "./userModel"; // Import User model
import Modal from './Modal.jsx';
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false); // State to toggle add user form

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user");
      const userList = response.data.map(user => new User(user._id, user.name, user.email)); // Use User model
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    if (!name || !email) return;

    try {
      const response = await axios.post("http://localhost:5000/user", { name, email });
      const newUser = new User(response.data._id, response.data.name, response.data.email);
      setUsers([...users, newUser]);
      setMessage("User added successfully!");
      setName("");
      setEmail("");
      setShowAddUserForm(false); // Hide form after adding user
    } catch (error) {
      setMessage("Error adding user.");
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setMessage("User deleted successfully!");
    } catch (error) {
      setMessage("Error deleting user.");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="relative p-6 max-w-md mx-auto">
      {/* Add User Button in the top right corner */}
      <button 
        className="absolute right-4 top-4 bg-green-500 text-white p-2 rounded flex items-center"
        onClick={() => setShowAddUserForm(!showAddUserForm)}
      >
        <div className="flex flex-row items-center">
          <IoIosAddCircle size={20} className="mr-1" /> 
          <span>Add User</span>
        </div>
      </button>
      
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}

      {/* Conditional rendering of the form for adding a new user */}
      {showAddUserForm && (
        <div className="border rounded p-4 mb-4 bg-gray-100">
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 w-full" onClick={addUser}>
            Submit
          </button>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-4">User List</h3>
      <ul className="mt-2 border rounded p-4 bg-gray-100">
        {users.length > 0 ? (
          users.map((user) => (
            <li 
              key={user.id} 
              className="border p-2 flex justify-between items-center mb-2 bg-white rounded"
            >
              <span className="text-sm font-medium">{user.name} - {user.email}</span>
              <div className="flex flex-row items-center gap-2">
                <button
                  className="bg-yellow-500 text-white p-2 rounded flex items-center justify-center"
                  onClick={() => { 
                    setEditingUser(user); 
                    setName(user.name); 
                    setEmail(user.email); 
                    setMessage("Editing user"); 
                  }}
                >
                  <FaRegEdit size={16} />
                </button>

                <button
                  className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
                  onClick={() => deleteUser(user.id)}
                >
                  <AiFillDelete size={18} />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No users available. Add some users to display.</p>
        )}
      </ul>
    </div>
  );
};

export default UserManagement;
