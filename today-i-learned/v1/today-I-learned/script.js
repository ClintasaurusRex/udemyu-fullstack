const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

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

// Selecting DOM elements

const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

// Create DOM elements: Render facts in list
factsList.innerHTML = '';

// Load data from supabase

async function loadFacts() {
  const res = await fetch(
    'https://hhedmupgupwvjrohkvhr.supabase.co/rest/v1/facts',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZWRtdXBndXB3dmpyb2hrdmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NDc3MjksImV4cCI6MjA1NDAyMzcyOX0.0WPZbEbxZw4h_mAselhuKhGQ_PP1P6lZ7i4XCT2hM_E',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZWRtdXBndXB3dmpyb2hrdmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NDc3MjksImV4cCI6MjA1NDAyMzcyOX0.0WPZbEbxZw4h_mAselhuKhGQ_PP1P6lZ7i4XCT2hM_E',
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  // const filteredData = data.filter((fact) => fact.category === 'society');

  createFactsList(data);
}
loadFacts();
// createFactsList(initialFacts);
// createFactsList([{ text: 'Jonas' }]);

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `
    <li class="fact">
                <p>
                  ${fact.text}
                  <a
                    class="source"
                    href=${fact.source}
                    target="_blank"
                    >(Source)</a
                  >
                </p>
                <span
                  class="tag"
                  style="background-color: ${
                    CATEGORIES.find((cat) => cat.name === fact.category).color
                  }"
                  >${fact.category}</span
                
                </li>`
  );

  console.log(htmlArr);
  const html = htmlArr.join('');
  factsList.insertAdjacentHTML('afterbegin', html);
}

// Toggle form visiblily
btn.addEventListener('click', function () {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    btn.textContent = 'Close';
  } else {
    form.classList.add('hidden');
    btn.textContent = 'Share a fact';
  }
});

console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
console.log([7, 64, 6, -23, 11].find((el) => el > 10));

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
