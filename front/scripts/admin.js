const API_URL = "https://survey-jbkq.onrender.com/survey";

// Mostrar usuario (puedes traerlo desde backend en el futuro)
document.getElementById("userInfo").innerText = "Sesión activa";

// Funciones
async function getAll() {
  const res = await fetch(API_URL);
  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

async function getById() {
  const id = document.getElementById("surveyId").value;
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

async function deleteById() {
  const id = document.getElementById("surveyId").value;
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

async function updateById() {
  const id = document.getElementById("surveyId").value;
  const body = {
    career: "Administración",
    transporte: "Taxi",
    frecuencia: "Ocasionalmente 1-2",
    gasto: "31-40",
    tiempo: "15-30 minutos"
  };

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

function logout() {
  window.location.href = "/admin/logout";
}
