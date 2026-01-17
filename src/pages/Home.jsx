import { Link } from "react-router-dom";
import StudentView from "../features/students/StudentView";

export default function Home() {
  return (
    <div className="p-5 py-2">
      <h1 className="text-2xl mb-2 font-semibold">Studnet View</h1>
      <button className="text-sm bg-blue-500 text-white font-semibold px-4 py-2 rounded-md ">
        <Link to="/add-student">Add Student</Link>
      </button>

      <h1 className="text-2xl mt-3 font-semibold">Student List</h1>
      <StudentView />
    </div>
  );
}
