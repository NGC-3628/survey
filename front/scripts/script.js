const form = document.getElementById('surveyForm');
const thanksScreen = document.getElementById('thanksScreen');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  // 1️⃣ Recolectar los valores del formulario
  const formData = new FormData(form);

  const body = {
    career: formData.get('career'),
    transporte: formData.get('transporte'),
    otroTransporte: formData.get('otroTransporte'),
    frecuencia: formData.get('frecuencia'),
    gasto: formData.get('gasto'),
    tiempo: formData.get('tiempo')
  };

  try {
    //Enviar al backend
    const res = await fetch('http://localhost:2700/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Error al enviar la encuesta');

    const data = await res.json();

    //Guardar el id devuelto para luego hacer GET /survey/:id
    localStorage.setItem('surveyId', data._id);

    //Cambiar a pantalla de gracias
    form.style.display = 'none';
    thanksScreen.style.display = 'block';
  } catch (err) {
    console.error(err);
    alert('Hubo un error al enviar la encuesta');
  }
});

function resetForm() {
  form.reset();
  form.style.display = 'block';
  thanksScreen.style.display = 'none';
}

// requerido para "otro" en transporte
const radioOtro = document.getElementById('radioOtro');
const inputOtro = document.getElementById('inputOtro');
const radiosTransporte = document.querySelectorAll('input[name="transporte"]');

radiosTransporte.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radioOtro.checked) {
      inputOtro.required = true;
    } else {
      inputOtro.required = false;
      inputOtro.value = '';
    }
  });
});

// actualizar año del footer
document.querySelector("#year").textContent = new Date().getFullYear();
