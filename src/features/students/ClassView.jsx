import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, setFilter, setSortBy } from "./studentsSlice";

export default function ClassView() {
  const dispatch = useDispatch();
  const { students, status, error, filter, sortBy } = useSelector(
    (state) => state.students
  );

  const filterStudents =
    filter == "All"
      ? students
      : students.filter(
          (student) => student.gender == (filter == "Boys" ? "Male" : "Female")
        );

  const sortedStudents = [...filterStudents].sort((a, b) => {
    if (sortBy == "Name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy == "Marks") {
      return b.marks - a.marks;
    }

    if (sortBy == "Attendence") {
      return b.attendance - a.attendance;
    }
  });

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (students && students.length > 0) {
    return (
      <div className="mt-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <label htmlFor="genderFilter">Filter by Gender: </label>
            <select
              id="genderFilter"
              className="border max-w-50"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>
          </div>

          <div className="flex gap-3">
            <label htmlFor="sortBy">Sort By: </label>
            <select
              id="sortBy"
              className="border max-w-50"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="Name">Name</option>
              <option value="Marks">Marks</option>
              <option value="Attendence">Attendence</option>
            </select>
          </div>
        </div>

        <ul className="mt-3">
          {sortedStudents.map((student) => (
            <li key={student._id}>
              • &nbsp;{student.name} - {student.gender} - Marks: {student.marks}{" "}
              - Attendence: {student.attendance}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
