const form = document.getElementById('surveyForm');
const thanksScreen = document.getElementById('thanksScreen');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  // Aquí podrías enviar datos al servidor si quisieras.
  form.style.display = 'none';
  thanksScreen.style.display = 'block';
});

function resetForm() {
  form.reset();
  form.style.display = 'block';
  thanksScreen.style.display = 'none';
}

//requiered field for "other option at quyestion 2"
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

//updated time year by year at footer.
document.querySelector("#year").textContent = new Date().getFullYear();
