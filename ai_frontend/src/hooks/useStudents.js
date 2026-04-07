// /hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents, createStudent, deleteStudent } from "@/api/admin.api";
import { showSuccess, showError } from "@/utils/toast";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
};

// Student Create 
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,

   onSuccess: async () => {
      showSuccess("Student added successfully");

      await queryClient.invalidateQueries({
        queryKey: ["students"], // auto refetch
      });
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
      showSuccess("Student deleted");
      queryClient.invalidateQueries(["students"]);
    },

    onError: () => {
      showError("Delete failed");
    },
  });
};