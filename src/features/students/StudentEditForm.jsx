import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent, editStudent } from "./studentsSlice";
import { useLocation } from "react-router-dom";

export default function StudentEditForm() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const student = state?.studentDetails;

  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [grade, setGrade] = useState(student.grade);
  const [gender, setGender] = useState(student.gender);
  const [attendance, setAttendance] = useState(student.attendance);
  const [marks, setMarks] = useState(student.marks);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(student._id);

    dispatch(
      editStudent({
        studentId: student._id,
        dataToUpdate: { name, age, grade, gender, attendance, marks },
      })
    );
    setName("");
    setAge("");
    setGrade("");
    setGender("");
    setAttendance("");
    setMarks("");
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-400 px-2 outline-none max-w-50"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          className="border border-gray-400 px-2 outline-none max-w-50"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          className="border border-gray-400 px-2 outline-none max-w-50"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <div>
          <label htmlFor="gender">Gender :</label>&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
            />
            &nbsp; Male
          </label>
          &nbsp;
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
            />
            &nbsp; Female
          </label>
        </div>

        <input
          type="number"
          placeholder="Attendence"
          className="border border-gray-400 px-2 outline-none max-w-50"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />

        <input
          type="number"
          placeholder="Marks"
          className="border border-gray-400 px-2 outline-none max-w-50"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <button className="max-w-50 text-white py-1 rounded-sm cursor-pointer bg-blue-500">
          Update
        </button>
      </form>
    </>
  );
}
