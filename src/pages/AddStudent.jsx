import StudentForm from "../features/students/StudentForm";

export default function AddStudent() {
  return (
    <div className="px-5 py-2">
      <h1 className="text-xl font-semibold">Add Student</h1>
      <StudentForm />
    </div>
  );
}
