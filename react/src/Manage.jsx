import { useState, useEffect } from "react";
import axios from "axios";

export default function Manage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    import("axios").then((axios)=>{
        axios.get("http://localhost:3000/users").then((response)=>{
            console.log(response.data);
        });
    });
    fetchUsers();
  }, []);

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age) {
      setError("Name and Age are required");
      return;
    }

    try {
      if (editingUser) {
        // Update user (PUT request)
        await axios.put(`http://localhost:3000/users/${editingUser._id}`, {
          name,
          age,
        });
      } else {
        // Add user (POST request)
        await axios.post("http://localhost:3000/register", { name, age });
      }
      setName("");
      setAge("");
      setEditingUser(null);
      fetchUsers(); // Refresh users list
    } catch (err) {
      setError("Error saving user. Name might already exist.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setName(user.name);
    setAge(user.age);
    setEditingUser(user);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">{editingUser ? "Edit User" : "Add User"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editingUser ? "Update User" : "Add User"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <h2 className="text-xl font-bold mt-6">Users List</h2>
      <ul className="space-y-2 mt-4">
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center border p-2 rounded">
            <span>{user.name} - {user.age} years</span>
            <div>
              <button onClick={() => handleEdit(user)} className="bg-yellow-400 text-white p-1 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white p-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
