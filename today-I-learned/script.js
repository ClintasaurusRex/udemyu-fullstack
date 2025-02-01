const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

factsList.innerHTML = '';

btn.addEventListener('click', function () {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    btn.textContent = 'Close';
  } else {
    form.classList.add('hidden');
    btn.textContent = 'Share a fact';
  }
});

/* function calcAge(year) {
  const age = 2024 - year;

  const msg = age > 19 ? 'You can vote' : 'You are not old enough to vote';
  return msg;
}

console.log(calcAge(2023));

// [2, 3, 4, 5, 6].forEach(
//   (num) => (document.querySelector('p').textContent += num + ' ')
// );
const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

const mapped = CATEGORIES.map((name) => name.name);
console.log(mapped);

const obj = Object.values(CATEGORIES);

const mapObj = obj.map((name) => name); */
