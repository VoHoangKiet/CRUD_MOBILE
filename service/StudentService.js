import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:5000";

export const getAll = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/students`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/students/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createStudent = async (student) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/students`, student);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateStudentById = async (student,id) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/students/${id}`, student);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteById = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/students/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};