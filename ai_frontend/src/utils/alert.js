import Swal from "sweetalert2";

// Delete Confirmation
export const confirmDelete = async (name) => {
  return Swal.fire({
    title: "Are you sure?",
    text: `Delete student "${name}"?`,
    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",

    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",

    background: "#18181b",
    color: "#fff",
  });
};


// Success Alert
export const successAlert = (message) => {
  Swal.fire({
    icon: "success",
    title: message,

    timer: 1500,
    showConfirmButton: false,

    background: "#18181b",
    color: "#fff",
  });
};


// Error Alert
export const errorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: message,

    background: "#18181b",
    color: "#fff",
  });
};   