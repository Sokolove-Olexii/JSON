const studentForm = document.getElementById("studentForm");
const studentTable = document
  .getElementById("studentTable")
  .querySelector("tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];

updateTable();

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();
  const course = document.getElementById("course").value.trim();
  const faculty = document.getElementById("faculty").value.trim();
  const subjects = document.getElementById("subjects").value.trim();

  if (!firstName || !lastName || !age || !course || !faculty || !subjects) {
    alert("Заповніть всі поля!");
    return;
  }

  const student = {
    firstName,
    lastName,
    age,
    course,
    faculty,
    subjects: subjects.split(","),
  };

  students.push(student);
  saveStudents();
  updateTable();

  studentForm.reset();

  console.log(students);
  //stringify massive
  const studentsJson = JSON.stringify(students);
  console.log(studentsJson);
});

function updateTable() {
  studentTable.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.faculty}</td>
      <td>${student.subjects.join(", ")}</td>
      <td class="actions">
        <button class="edit" onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    studentTable.appendChild(row);
  });
}

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveStudents();
  updateTable();
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("firstName").value = student.firstName;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("age").value = student.age;
  document.getElementById("course").value = student.course;
  document.getElementById("faculty").value = student.faculty;
  document.getElementById("subjects").value = student.subjects.join(", ");

  deleteStudent(index);
}
