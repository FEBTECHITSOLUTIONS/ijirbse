import React from 'react';
import { FiPlus } from 'react-icons/fi';

const Header = ({ onAdd }) => (
  <header className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0">
    <h1 className="text-xl font-semibold">Editors Management</h1>
    <button
      onClick={onAdd}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      <FiPlus /> Add Editor
    </button>
  </header>
);

export default Header;
