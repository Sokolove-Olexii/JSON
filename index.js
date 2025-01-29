const studentForm = document.getElementById("studentForm");
const studentTable = document
  .getElementById("studentTable")
  .querySelector("tbody");

let students = [];

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;
  const faculty = document.getElementById("faculty").value;
  const subjects = document.getElementById("subjects").value.split(",");

  if (!firstName || !lastName || !age || !course || !faculty) {
    alert("Заповніть всі поля!");
    return;
  }

  const student = { firstName, lastName, age, course, faculty, subjects };
  students.push(student);
  updateTable();

  studentForm.reset();
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

function deleteStudent(index) {
  students.splice(index, 1);
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
