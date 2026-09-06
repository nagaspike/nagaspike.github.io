document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('year').textContent = new Date().getFullYear();

  var vessel = document.getElementById('heroVessel');
  if (vessel) vessel.classList.add('hero-vessel-enter');

  var progressBar = document.getElementById('progressBar');
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  var form = document.getElementById('contactForm');
  var successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    successMsg.textContent = '';

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    successMsg.textContent = 'Pesan terkirim. Kami akan balas lewat email dalam 1–2 hari kerja.';
    form.reset();
    form.classList.remove('was-validated');
  });

  form.querySelectorAll('input, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      if (form.classList.contains('was-validated')) {
        field.checkValidity();
      }
    });
  });

});