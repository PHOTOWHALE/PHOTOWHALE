'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  return (
    <ToastContainer
      position={useIsMobile() ? 'bottom-center' : 'top-left'}
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      closeButton={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export const Toast = {
  success: (message: React.ReactNode | string) => {
    toast.success(message, {
      className: 'pw-toast',
    });
  },
  error: (message: React.ReactNode | string) => {
    toast.error(message, {
      className: 'pw-toast',
    });
  },
};
