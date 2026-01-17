import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  setTopStudent,
  updateSchoolStats,
} from "./studentsSlice";

export default function SchoolView() {
  const dispatch = useDispatch();
  const {
    students,
    status,
    error,
    totalStudents,
    averageAttendence,
    averageMarks,
    topStudent,
  } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students.length === 0) return;

    const totalStudents = students.length;
    const averageAttendence = students.reduce(
      (acc, curr) =>
        acc + (curr.attendance ? curr.attendance : 0) / totalStudents,
      0,
    );
    const averageMarks = students.reduce(
      (acc, curr) => acc + (curr.marks ? curr.marks : 0) / totalStudents,
      0,
    );
    const topStudent = students.reduce((acc, curr) =>
      curr.marks > acc.marks ? curr : acc,
    );

    dispatch(
      updateSchoolStats({ totalStudents, averageAttendence, averageMarks }),
    );

    dispatch(setTopStudent(topStudent));
  }, [students, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  if (students && topStudent && students.length > 0) {
    return (
      <>
        <p>Total Students : {totalStudents}</p>
        <p>Average Attendence : {averageAttendence.toFixed(2)}</p>
        <p>Average Marks : {averageMarks.toFixed(2)}</p>
        <p>Top Student : {topStudent.name}</p>
      </>
    );
  }
}
