const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');

btn.addEventListener('click', function () {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    btn.textContent = 'Close';
  } else {
    form.classList.add('hidden');
    btn.textContent = 'Share a fact';
  }
});

function calcAge(year) {
  const age = 2024 - year;

  const msg = age > 19 ? 'You can vote' : 'You are not old enough to vote';
  return msg;
}

console.log(calcAge(2023));

// [2, 3, 4, 5, 6].forEach(
//   (num) => (document.querySelector('p').textContent += num + ' ')
// );
