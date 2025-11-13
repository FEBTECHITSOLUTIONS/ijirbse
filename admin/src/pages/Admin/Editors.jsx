import React, { useEffect, useState } from "react";
import UserTable from "../../components/admin/UserTable";
import UserFormModal from "../../components/admin/UserFormModal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
} from "../../api/adminApi";

const Editors = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
console.log(users);

  // 🔄 Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      console.log(res);
      
      // In case backend wraps data in { data: [...] }
      const data = res?.data?.data || res?.data || res || [];

      // Map to ensure all optional fields exist
      const normalized = data.map((u) => ({
        ...u,
        subRole: u.subRole || "",
        address: u.address || "",
        backGround: u.backGround || "",
      }));

      setUsers(normalized);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  // ➕ Create new user
  const handleCreate = async (user) => {
    try {
      const cleanUser = {
        name: user.name.trim(),
        email: user.email.trim(),
        password: user.password?.trim() || undefined,
        role: user.role || "editor",
        subRole: user.subRole?.trim() || "",
        address: user.address?.trim() || "",
        backGround: user.backGround?.trim() || "",
      };

      const res = await registerUser(cleanUser);
      if (res.status < 300) {
        toast.success(res.data?.message || "Editor added successfully");
        fetchUsers();
      } else {
        toast.error(res.data?.message || "Failed to add editor");
      }
    } catch (error) {
      console.error("Create user error:", error);
      toast.error("An error occurred while creating user");
    } finally {
      setShowModal(false);
    }
  };

  // ✏️ Update existing user
  const handleUpdate = async (id, user) => {
    try {
      const updatedUser = {
        name: user.name?.trim(),
        email: user.email?.trim(),
        role: user.role || "editor",
        subRole: user.subRole?.trim() || "",
        address: user.address?.trim() || "",
        backGround: user.backGround?.trim() || "",
      };

      // Don’t include password if not provided
      if (user.password?.trim()) {
        updatedUser.password = user.password.trim();
      }

      const res = await updateUser(id, updatedUser);
      console.log(res);
      
      if (res.status < 300) {
        toast.success(res.data?.message || "Editor updated successfully");
        fetchUsers();
      } else {
        toast.error(res || "Failed to update editor");
      }
    } catch (error) {
      console.error("Update user error:", error);
      toast.error("An error occurred while updating user");
    } finally {
      setShowModal(false);
    }
  };

  // 🗑 Delete user
  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.status < 300) {
        toast.success(res.data?.message || "Editor deleted successfully");
        fetchUsers();
      } else {
        toast.error(res.data?.message || "Failed to delete editor");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("An error occurred while deleting user");
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="p-6 ">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Editors</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Editor
        </button>
      </div>

      <UserTable
        users={users}
        loading={loading}
        onEdit={(u) => {
          setEditUser(u);
          setShowModal(true);
        }}
        onDelete={(u) => setConfirmDelete(u)}
      />

      {/* 🧩 Create / Edit Modal */}
      {showModal && (
        <UserFormModal
          user={editUser}
          onClose={() => {
            setShowModal(false);
            setEditUser(null);
          }}
          onSubmit={(u) => {
            editUser ? handleUpdate(editUser._id, u) : handleCreate(u);
          }}
        />
      )}

      {/* 🗑 Confirm Delete Dialog */}
      {confirmDelete && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${confirmDelete.name}"?`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete._id)}
        />
      )}
    </div>
  );
};

export default Editors;
