import { createClient } from '@supabase/supabase-js';
console.log('All env vars:', process.env);
console.log('Test env:', process.env.REACT_APP_TEST);
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase Key:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
