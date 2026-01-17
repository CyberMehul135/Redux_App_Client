import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import AddStudent from "./pages/AddStudent";
import Class from "./pages/Class";
import EditStudent from "./pages/EditStudent";
import School from "./pages/School";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="px-5 py-2 flex items-center ">
          <h3 className="font-semibold text-xl">Student Management System</h3>
          <div>
            <ul className="flex gap-2 ml-5">
              <li>
                <Link to="/">Students</Link>
              </li>
              <li>
                <Link to="/class">Class</Link>
              </li>
              <li>
                <Link to="/school">School</Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student" element={<EditStudent />} />
          <Route path="/class" element={<Class />} />
          <Route path="/school" element={<School />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
