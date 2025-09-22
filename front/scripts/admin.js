const backendUrl = "https://survey-jbkq.onrender.com/survey";

// Mostrar usuario logueado
document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("https://survey-jbkq.onrender.com/admin", { credentials: "include" });
  const text = await res.text();
  document.getElementById("userInfo").innerHTML = text;
});

// Logout
function logout() {
  window.location.href = "https://survey-jbkq.onrender.com/admin/logout";
}

// Obtener todas las encuestas
async function getAll() {
  const res = await fetch(backendUrl);
  const data = await res.json();
  renderTable(data);
  document.getElementById("filters").style.display = "block";
}

// Filtrar por carrera
async function filterByCareer(career) {
  const res = await fetch(backendUrl);
  const data = await res.json();
  const filtered = data.filter(s => s.carrera === career);
  renderTable(filtered);
}

// Renderizar tabla
function renderTable(data) {
  const tbody = document.querySelector("#surveyTable tbody");
  tbody.innerHTML = "";
  document.querySelector("#surveyTable").style.display = "table";
  document.querySelector("#total").innerText = `Total: ${data.length}`;

  data.forEach(survey => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${survey.career}</td>
      <td>${survey.transporte}</td>
      <td>${survey.gasto}</td>
      <td>${survey.tiempo}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Ver encuesta por ID
async function getById() {
  const id = document.getElementById("surveyId").value;
  if (!id) return alert("Ingresa un ID");
  const res = await fetch(`${backendUrl}/${id}`);
  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

// Borrar encuesta por ID
async function deleteById() {
  const id = document.getElementById("surveyId").value;
  if (!id) return alert("Ingresa un ID");
  if (!confirm("¿Seguro que deseas borrar esta encuesta?")) return;
  await fetch(`${backendUrl}/${id}`, { method: "DELETE" });
  alert("Encuesta eliminada");
  getAll();
}

// Actualizar encuesta por ID
async function updateById() {
  const id = document.getElementById("surveyId").value;
  if (!id) return alert("Ingresa un ID");

  const nuevoTransporte = prompt("Nuevo transporte:");
  const nuevoGasto = prompt("Nuevo gasto:");
  const nuevoTiempo = prompt("Nuevo tiempo:");
  const nuevaCarrera = prompt("Nueva carrera:");

  const body = {
    transporte: nuevoTransporte,
    gasto: nuevoGasto,
    tiempo: nuevoTiempo,
    carrera: nuevaCarrera
  };

  await fetch(`${backendUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  alert("Encuesta actualizada");
  getAll();
}
