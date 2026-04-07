import api from "@/utils/api";

// GET ALL BATCHES
export const getBatches = async () => {
  const res = await api.get("/batches/batches-get-all");
  return res.data;
};

// CREATE BATCH
export const createBatch = async (data) => {
  const res = await api.post("/batches/batches-create", data);
  return res.data;
};

// GET SINGLE BATCH
export const getBatch = async (id) => {
  const res = await api.get(`/batches/batches-get/${id}`);
  return res.data;
};

// DELETE BATCH
export const deleteBatch = async (id) => {
  const res = await api.delete(`/batches/batches-delete/${id}`);
  return res.data;
};