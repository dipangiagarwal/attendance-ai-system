import toast from "react-hot-toast";

// success
export const showSuccess = (message) => {
  toast.success(message, {
    duration: 1000,
  });
};

// error
export const showError = (message) => {
  toast.error(message, {
    duration: 3000,
  });
};

// loading (optional advanced)
export const showLoading = (message) => {
  return toast.loading(message);
};

// dismiss
export const dismissToast = (id) => {
  toast.dismiss(id);
};