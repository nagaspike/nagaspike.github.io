document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('year').textContent = new Date().getFullYear();

  var vessel = document.getElementById('heroVessel');
  if (vessel) vessel.classList.add('hero-vessel-enter');

  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

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

  var validators = {
    name: function (value) {
      return value.trim().length >= 2 ? '' : 'Masukkan nama kamu.';
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? '' : 'Masukkan email yang valid.';
    },
    message: function (value) {
      return value.trim().length >= 10 ? '' : 'Ceritakan sedikit lebih lengkap (min. 10 karakter).';
    }
  };

  function showError(fieldName, message) {
    var input = document.getElementById(fieldName);
    var errorEl = document.getElementById(fieldName + 'Error');
    var fieldWrap = input.closest('.field');
    errorEl.textContent = message;
    fieldWrap.classList.toggle('has-error', Boolean(message));
  }

  Object.keys(validators).forEach(function (fieldName) {
    var input = document.getElementById(fieldName);
    input.addEventListener('input', function () {
      var error = validators[fieldName](input.value);
      showError(fieldName, error);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successMsg.textContent = '';

    var hasError = false;
    Object.keys(validators).forEach(function (fieldName) {
      var input = document.getElementById(fieldName);
      var error = validators[fieldName](input.value);
      showError(fieldName, error);
      if (error) hasError = true;
    });

    if (hasError) return;

    successMsg.textContent = 'Pesan terkirim. Kami akan balas lewat email dalam 1–2 hari kerja.';
    form.reset();
    Object.keys(validators).forEach(function (fieldName) {
      showError(fieldName, '');
    });
  });

});