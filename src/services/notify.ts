import { toast } from 'react-toastify';

type Notify = {
  success: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
};

export const notify: Notify = {
  success: (message) => toast.success(message),
  warning: (message) => toast.warn(message),
  info: (message) => toast.info(message),
  error: (message) => toast.error(message),
};
