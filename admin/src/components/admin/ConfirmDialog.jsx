import React from 'react';

const ConfirmDialog = ({ message, onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center">
      <p className="text-gray-800 mb-6">{message}</p>
      <div className="flex justify-center gap-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
