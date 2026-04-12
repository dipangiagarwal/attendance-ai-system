// /hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents, createStudent, deleteStudent } from "@/api/admin.api";
import { showSuccess, showError } from "@/utils/toast";
import { confirmDelete, successAlert, errorAlert } from "@/utils/alert";
import { useRouter } from "next/navigation";


export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
};

// Student Create 
export const useCreateStudent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,

   onSuccess: async () => {
      showSuccess("Student added successfully");

      await queryClient.invalidateQueries({
        queryKey: ["students"], // auto refetch
      });
      router.push("/dashboard/students");
    },

    onError: (error) => {
      showError(error?.response?.data?.message || "Failed");
    },
  });
};



// DELETE
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,

    onSuccess: () => {
      successAlert("Student deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },

    onError: () => {
      errorAlert("Delete failed");
    },
  });
};