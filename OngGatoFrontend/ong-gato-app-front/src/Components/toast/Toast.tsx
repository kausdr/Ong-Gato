import { useEffect } from 'react';
import { IoIosCheckmarkCircle, IoIosCloseCircle, IoIosWarning } from 'react-icons/io';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  onClose: (id: number) => void;
}

const toastConfig = {
  success: {
    icon: <IoIosCheckmarkCircle className="text-green-500" size={24} />,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
  },
  error: {
    icon: <IoIosCloseCircle className="text-red-500" size={24} />,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
  },
  warning: {
    icon: <IoIosWarning className="text-yellow-500" size={24} />,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
  },
};

export const Toast = ({ id, message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [id, onClose]);

  const { icon, bgColor, borderColor } = toastConfig[type];

  return (
    <div className={`flex items-center p-4 mb-4 text-gray-700 rounded-lg shadow-lg ${bgColor} border-l-4 ${borderColor} animate-fade-in-right`}>
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        onClick={() => onClose(id)}
        className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
};