import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${API_URL}/students`);

    return response.data;
  },
);

export const addStudent = createAsyncThunk(
  "students/addStudents",
  async (newStudent) => {
    const response = await axios.post(`${API_URL}/students`, newStudent);

    return response.data;
  },
);

export const editStudent = createAsyncThunk(
  "students/editStudents",
  async ({ studentId, dataToUpdate }) => {
    const response = await axios.put(
      `${API_URL}/students/${studentId}`,
      dataToUpdate,
    );

    return response.data;
  },
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    const response = await axios.delete(
      `${API_URL}/students/${studentId}`,
      studentId,
    );

    return studentId;
  },
);

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "Name",

    totalStudents: 0,
    averageAttendence: 0,
    averageMarks: 0,
    topStudent: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    updateSchoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageAttendence = action.payload.averageAttendence;
      state.averageMarks = action.payload.averageMarks;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id != action.payload,
      );
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(editStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editStudent.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id,
      );

      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });
    builder.addCase(editStudent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { setFilter, setSortBy, updateSchoolStats, setTopStudent } =
  studentsSlice.actions;
