async function fetchSurveys() {
    try {
      const res = await fetch("https://survey-jbkq.onrender.com/survey", {
        credentials: "include" // mantiene cookie de sesión
      });
  
      if (res.status === 401) {
        // no autenticado
        document.getElementById("notLoggedIn").style.display = "block";
        document.getElementById("loggedIn").style.display = "none";
        return;
      }
  
      const data = await res.json();
  
      document.getElementById("notLoggedIn").style.display = "none";
      document.getElementById("loggedIn").style.display = "block";
  
      const tbody = document.querySelector("#surveyTable tbody");
      tbody.innerHTML = "";
  
      data.forEach(s => {
        const row = `<tr>
          <td>${s.career}</td>
          <td>${s.transporte}</td>
          <td>${s.frecuencia}</td>
          <td>${s.gasto}</td>
          <td>${s.tiempo}</td>
          <td>${new Date(s.createdAt).toLocaleString()}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    } catch (err) {
      console.error(err);
      alert("Error al cargar encuestas");
    }
  }
  
  function logout() {
    window.location.href = "https://survey-jbkq.onrender.com/admin/logout";
  }
  
  // Llamar al cargar
  fetchSurveys();
  