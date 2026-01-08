'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  const isMobile = useIsMobile();
  return (
    <ToastContainer
      position={isMobile ? 'bottom-center' : 'top-left'}
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      closeButton={false}
      pauseOnFocusLoss={!isMobile}
      draggable={!isMobile}
      pauseOnHover={!isMobile}
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
