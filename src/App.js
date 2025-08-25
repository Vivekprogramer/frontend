import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.age) {
      alert("All fields are required");
      return;
    }
    try {
      await axios.post("http://localhost:5000/addUser", form);
      setForm({ name: "", email: "", age: "" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          User Registration
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={form.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>

        <h3 className="text-lg font-semibold text-gray-700 mt-6">Users</h3>
        <ul className="mt-2 space-y-2">
          {users.map((u) => (
            <li key={u.id} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg shadow-sm">
              <span className="font-bold">{u.name}</span> | {u.email} | {u.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
