import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBatches,
  createBatch,
  deleteBatch,
} from "@/api/batch.api";
import { showSuccess, showError } from "@/utils/toast";

// GET ALL
export const useBatches = () => {
  return useQuery({
    queryKey: ["batches"],
    queryFn: getBatches,
  });
};

// CREATE
export const useCreateBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBatch,

    onSuccess: () => {
      showSuccess("Batch created successfully");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },

    onError: (error) => {
      showError(error?.response?.data?.message || "Failed");
    },
  });
};

// DELETE
export const useDeleteBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBatch,

    onSuccess: () => {
      showSuccess("Batch deleted");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },

    onError: () => {
      showError("Delete failed");
    },
  });
};