import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "./studentsSlice";

export default function StudentForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [err, setErr] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (gender === "") {
      setErr("Please Select Gender");
      return;
    }

    dispatch(addStudent({ name, age, grade, gender }));
    setName("");
    setAge("");
    setGrade("");
    setGender("");
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
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="border border-gray-400 px-2 outline-none max-w-50"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Grade"
          className="border border-gray-400 px-2 outline-none max-w-50"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
        <div>
          <label htmlFor="gender">Gender :</label>&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => {
                setGender(e.target.value);
                setErr("");
              }}
            />
            &nbsp; Male
          </label>
          &nbsp;
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => {
                setGender(e.target.value);
                setErr("");
              }}
            />
            &nbsp; Female
          </label>
          {err && <p className="text-red-500">{err}</p>}
        </div>

        <button className="max-w-50 text-white py-1 rounded-sm cursor-pointer bg-blue-500">
          Add
        </button>
      </form>
    </>
  );
}
