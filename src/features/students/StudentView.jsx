import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { Link } from "react-router-dom";

export default function StudentView() {
  const dispatch = useDispatch();
  const {
    students = [],
    status,
    error,
  } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <>
      <ul>
        {students &&
          students.length > 0 &&
          students.map((student) => (
            <li key={student._id} className="underline text-blue-500">
              <Link to={`/student/${student._id}`}>
                {student.name} (Age: {student.age})
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
