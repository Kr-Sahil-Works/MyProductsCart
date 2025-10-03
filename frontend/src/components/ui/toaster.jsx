import { Toaster as HotToaster, toast } from "react-hot-toast";
import React from "react";

export const Toaster = () => (
  <HotToaster
    position="bottom-center"
    toastOptions={{
      duration: 4000,
      style: {
        borderRadius: '8px',
        padding: '8px 12px',
        fontWeight: 'bold',
        fontSize: '14px',
      },
      success: {
        // Custom render for success toast
        render: (msg) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{msg}</span>
            <span>🛒</span> {/* Icon after the text */}
          </div>
        ),
        style: {
          background: '#28a745',
          color: '#ffffff',
        },
      },
      error: {
        icon: '😔', // default icon on left
        style: {
          background: '#dc3545',
          color: '#ffffff',
        },
      },
    }}
  />
);

export const toaster = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
};
