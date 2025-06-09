import { createContext, useState, useContext, ReactNode } from 'react';
import { ToastType } from '../Components/toast/Toast';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  onClose: (id: number) => void;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children, renderToasts }: { children: ReactNode, renderToasts: (toasts: ToastMessage[]) => ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = new Date().getTime();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, onClose: removeToast }]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {renderToasts(toasts.map(toast => ({ ...toast, onClose: removeToast })))}
    </ToastContext.Provider>
  );
};