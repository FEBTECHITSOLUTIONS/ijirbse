import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const UserTable = ({ users, loading, onEdit, onDelete }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center py-10 text-gray-500 text-sm">
        Loading users...
      </div>
    );

  return (
    <div className="overflow-auto max-h-screen bg-white rounded-xl shadow-md border border-gray-100">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3 text-left whitespace-nowrap">Name</th>
            <th className="p-3 text-left whitespace-nowrap">Email</th>
            <th className="p-3 text-left whitespace-nowrap">Role</th>
            <th className="p-3 text-left whitespace-nowrap">Sub Role</th>
            <th className="p-3 text-left whitespace-nowrap hidden md:table-cell">Address</th>
            <th className="p-3 text-left whitespace-nowrap hidden lg:table-cell">Background</th>
            <th className="p-3 text-left whitespace-nowrap hidden sm:table-cell">Created At</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-6 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 font-medium text-gray-800">{user.name || "—"}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">{user.subRole || "—"}</td>
                <td className="p-3 hidden md:table-cell">{user.address || "—"}</td>
                <td className="p-3 hidden lg:table-cell truncate max-w-xs">
                  {user.backGround || "—"}
                </td>
                <td className="p-3 hidden sm:table-cell text-gray-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
