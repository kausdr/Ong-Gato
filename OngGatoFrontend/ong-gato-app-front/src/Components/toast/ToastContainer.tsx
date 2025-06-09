import { Toast, ToastType } from './Toast';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  onClose: (id: number) => void;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
}

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="fixed top-5 right-5 z-50 w-full max-w-xs">
      {toasts.map(({ id, message, type, onClose }) => (
        <Toast
          key={id}
          id={id}
          message={message}
          type={type}
          onClose={onClose}
        />
      ))}
    </div>
  );
};