import './style.css';
import React, { useState } from 'react';

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

// function Counter() {
//   const [count, setCount] = useState(0);

//   const handleClick = function () {
//     setCount(count + 1);
//   };

//   const handleReset = function () {
//     setCount(0);
//   };

//   return (
//     <div>
//       <span style={{ fontSize: '40px' }}>{count}</span>
//       <button className='btn btn-large' onClick={handleClick}>
//         +1
//       </button>
//       <button className='btn btn-large' onClick={handleReset}>
//         Reset
//       </button>
//     </div>
//   );
// }

function App() {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = function () {
    setShowForm((show) => !show);
  };

  return (
    <>
      {/* Header */}
      <Header
        showForm={showForm}
        setShowForm={setShowForm}
        handleShowForm={handleShowForm}
      />

      {showForm ? <NewFactForm /> : null}

      <main className='main'>
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

function Header({ showForm, handleShowForm }) {
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <img
            src='logo.png'
            alt='Today I Learned Logo'
            height='68'
            width='68'
          />
          <h1>Today I Learned</h1>
        </div>

        <button className='btn btn-large btn-open' onClick={handleShowForm}>
          {showForm ? 'Close' : 'Share a fact'}
        </button>
      </header>
    </>
  );
}

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

function NewFactForm() {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const textLength = text.length;

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(text, source, category);
  };

  return (
    <form action='' className='fact-form ' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= 200) {
            setText(e.target.value);
            return;
          }
          alert('Ran out of characters');
        }}
      />
      <span>{200 - textLength}</span>
      <input
        type='text'
        placeholder='Trustworthy source...'
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select
        type='option'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=''>Choose Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large'>Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button className='btn btn-all-categories'>All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className='category'>
            <button
              onClick={() => console.log('click')}
              className='btn btn-category'
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList() {
  const facts = initialFacts;

  return (
    <section>
      Fact List
      <ul className='facts-list'>
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own </p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li key={fact.id} className='fact'>
      <p>
        {fact.text}
        <a
          className='source'
          href={fact.source}
          target='_blank'
          rel='noreferrer'
        >
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>❌ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
