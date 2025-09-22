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
let currentData = []; // global

async function getAll() {
  const res = await fetch(backendUrl);
  const data = await res.json();
  currentData = data; // guardamos en memoria
  renderTable(data);
  document.getElementById("filters").style.display = "block";
}

function filterByCareer(career) {
  if (!currentData.length) {
    alert("Primero carga todas las encuestas con 'Ver todas '.");
    return;
  }
  const filtered = currentData.filter(s => s.career === career);
  renderTable(filtered);
}


// Renderizar tabla
function renderTable(data) {
  const table = document.getElementById("surveyTable");
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  data.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.career}</td>
      <td>${s.transporte}</td>
      <td>${s.gasto}</td>
      <td>${s.tiempo}</td>
      <td>${s._id}</td>
      <td>
        <button onclick="deleteSurvey('${s._id}')">🗑️ Borrar</button>
        <button onclick="editSurvey('${s._id}')">✏️ Editar</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  table.style.display = "table";
  document.getElementById("total").innerText = `Total: ${data.length}`;
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
async function deleteSurvey(id) {
  if (!confirm(`¿Seguro que quieres borrar la encuesta ${id}?`)) return;

  const res = await fetch(`${backendUrl}/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert(`Encuesta ${id} eliminada`);
    getAll(); // recargar la tabla
  } else {
    alert("Error al borrar encuesta");
  }
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
