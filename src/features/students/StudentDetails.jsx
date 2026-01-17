import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteStudent, fetchStudents } from "./studentsSlice";

export default function StudentDetails() {
  const dispatch = useDispatch();
  const { id: studentId } = useParams();
  const { students, status, error } = useSelector((state) => state.students);
  const studentDetails = useSelector((state) =>
    state.students.students.find((student) => student._id == studentId)
  );

  const deleteStudentHandler = () => {
    dispatch(deleteStudent(studentDetails._id));
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (students && studentDetails) {
    return (
      <div className="flex flex-col gap-3">
        <p className="mt-2">Name: {studentDetails.name}</p>
        <p>Age: {studentDetails.age}</p>
        <p>Grade: {studentDetails.grade}</p>
        <p>Attendence: {studentDetails.attendance}</p>
        <p>Marks: {studentDetails.marks}</p>

        <div className="flex gap-4">
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-sm cursor-pointer">
            <Link to="/edit-student" state={{ studentDetails }}>
              Edit Details
            </Link>
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-sm cursor-pointer"
            onClick={deleteStudentHandler}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
