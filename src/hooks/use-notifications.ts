
import { toast } from 'sonner';

interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export const useNotifications = () => {
  const showSuccess = (message: string, options?: NotificationOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
    });
  };

  const showError = (message: string, options?: NotificationOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
    });
  };

  const showInfo = (message: string, options?: NotificationOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
    });
  };

  const showWarning = (message: string, options?: NotificationOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
  };
};
