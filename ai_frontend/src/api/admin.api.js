import api from "@/utils/api";



export const registerAdmin = async (data) => {
  const res = await api.post("/api/admin/register", data);
  return res.data;
};




export const loginAdmin = async (data) => {
  const res = await api.post("/api/admin/login", data);
  return res.data;
};


// GET ALL Student
export const getStudents = async () => {
  const res = await api.get("/students/get-all-student");
  return res.data
};

// CREATE Student
export const createStudent = async (data) => {
  const res = await api.post("/students/create-student", data);
  return res.data;
};



// GET SINGLE Student
export const getStudent = async (id) => {
  const res = await api.get(`/students/${id}`);
  return res.data;
};


// UPDATE Student
export const updateStudent = async (id, data) => {
  const res = await api.patch(`/students/${id}`, data);
  return res.data;
};

// DELETE  Student 
export const deleteStudent = async (id) => {
  const res = await api.delete(`/students/${id}`);
  return res.data;
};














export const getUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};