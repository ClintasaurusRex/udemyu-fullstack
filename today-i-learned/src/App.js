import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';

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

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from('facts').select('*'); // The * grabs all the data

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: facts, error } = await query

          .order('votesInteresting', { ascending: false })
          .limit(50);

        // console.log(facts);
        if (!error) setFacts(facts);
        else alert('There was a problem getting data');
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

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

      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList setFacts={setFacts} facts={facts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className='message'>Loading...</p>;
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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent the browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if data if valid and if so create a new fact

    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      // console.log('there is valid data');

      // 3. Create a new fact object

      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,

      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload fact to supabase and receive new fact obj

      setIsUploading(true);

      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // console.log(newFact);

      // 4. Add new fact to the UI: Add fact to interface
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset the input fields

      setText('');
      setSource('');
      setCategory('');

      // 6. Close the form

      setShowForm(false);
    }
  }

  return (
    <form action='' className='fact-form ' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type='text'
        placeholder='Trustworthy source...'
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        type='option'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value=''>Choose Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button
            className='btn btn-all-categories'
            onClick={() => {
              setCurrentCategory('all');
            }}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className='category'>
            <button
              onClick={() => {
                setCurrentCategory(cat.name);
              }}
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

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className='message'>
        No facts for this category yet. Create the first one!
      </p>
    );
  }

  return (
    <section>
      Fact List
      <ul className='facts-list'>
        {facts.map((fact) => (
          <Fact setFacts={setFacts} key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own </p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    // console.log(updatedFact);
  }

  return (
    <li key={fact.id} className='fact'>
      <p>
        {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
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
        <button
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote('votesMindblowing')}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          ❌ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
