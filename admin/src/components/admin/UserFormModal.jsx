import React, { useState, useEffect } from "react";

const UserFormModal = ({ user, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
    subRole: "",
    address: "",
    backGround: "",
  });

  // Prefill form data if editing
  useEffect(() => {
    if (user) {
      const { name, email, role, subRole, address, backGround } = user;
      setForm({
        name: name || "",
        email: email || "",
        password: "",
        role: role || "editor",
        subRole: subRole || "",
        address: address || "",
        backGround: backGround || "",
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl shadow-2xl p-6 sm:p-8 relative animate-fadeIn scroll-hidden max-h-[90vh] overflow-y-scroll 2xl:overflow-hidden ">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 text-center">
          {user ? "Edit User" : "Add New User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Password (only when creating) */}
          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          )}

          {/* Role & Sub Role — responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub Role (Optional)
              </label>
              <input
                type="text"
                name="subRole"
                placeholder="e.g. Associate Editor,Board Members ,Editor-in-Chief "
                value={form.subRole}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address (Optional)
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background (Optional)
            </label>
            <textarea
              name="backGround"
              placeholder="Academic background, expertise, etc."
              value={form.backGround}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end sm:justify-between gap-3 pt-4 border-t border-gray-200 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
