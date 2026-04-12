import { useMutation,useQuery } from "@tanstack/react-query";
import { registerAdmin ,loginAdmin,logoutAdmin,getDashboardData} from "@/api/admin.api";
import { showSuccess, showError } from "@/utils/toast";
import { useRouter } from "next/navigation";



// 🔹 Get Admin Info
export const useAdmin = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getDashboardData,
  });
};

// register
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerAdmin,
      onSuccess: (data) => {
      showSuccess("Admin registered successfully");
      router.push("/dashboardlogin");
    },

    onError: (error) => {
      showError(
        error?.response?.data?.message || "Registration failed"
      );
    },

  });
};


// login 
export const useLogin = (setRateLimitError) => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginAdmin,

    onSuccess: (data) => {
      showSuccess(data.message|| "Login successful");
      router.push("/dashboard");
    },

 onError: (error) => {

      const status = error?.response?.status;

      if (status === 429) {
        // Send error to UI
        setRateLimitError({
          status: 429,
          detail:
            error?.response?.data?.detail ||
            "Too many requests! Try again after 1 minute."
        });

        return;
      }

      // Normal error → toast
      showError(
        error?.response?.data?.detail || "Login failed"
      );
    },
  });
};



// 🔹 Logout
export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutAdmin,

    onSuccess: () => {
      showSuccess("Logged out successfully");
      router.push("/dashboardlogin");
    },

    onError: () => {
      showError("Logout failed");
    },
  });
};