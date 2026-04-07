import { useMutation } from "@tanstack/react-query";
import { registerAdmin ,loginAdmin} from "@/api/admin.api";
import { showSuccess, showError } from "@/utils/toast";
import { useRouter } from "next/navigation";




export const useRegister = () => {
  return useMutation({
    mutationFn: registerAdmin,
      onSuccess: (data) => {
      showSuccess("Admin registered successfully");
    },

    onError: (error) => {
      showError(
        error?.response?.data?.message || "Registration failed"
      );
    },

  });
};



export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginAdmin,

    onSuccess: (data) => {
      showSuccess(data.message || "Login successful");

      // ✅ redirect to dashboard
      router.push("/dashboard");
    },

    onError: (error) => {
      showError(
        error?.response?.data?.detail || "Login failed"
      );
    },
  });
};