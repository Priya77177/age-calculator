const dobInput = document.getElementById('dob');
const btn = document.getElementById('calcBtn');
const result = document.getElementById('result');

function calculateAge(dobDate, today = new Date()) {
  let years = today.getFullYear() - dobDate.getFullYear();
  let months = today.getMonth() - dobDate.getMonth();
  let days = today.getDate() - dobDate.getDate();

  if (days < 0) {
    // days in previous month relative to today
    const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonthLastDay;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

btn.addEventListener('click', () => {
  result.classList.remove('error');
  result.textContent = '';

  const val = dobInput.value;
  if (!val) {
    result.classList.add('error');
    result.textContent = 'Please choose a birth date.';
    return;
  }

  const dob = new Date(val + 'T00:00:00'); // ensure local midnight
  const today = new Date();
  if (dob > today) {
    result.classList.add('error');
    result.textContent = 'Birth date cannot be in the future.';
    return;
  }

  const { years, months, days } = calculateAge(dob, today);
  result.textContent = `Age: ${years} years, ${months} months, ${days} days`;
});