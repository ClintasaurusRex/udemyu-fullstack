import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://hhedmupgupwvjrohkvhr.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZWRtdXBndXB3dmpyb2hrdmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NDc3MjksImV4cCI6MjA1NDAyMzcyOX0.0WPZbEbxZw4h_mAselhuKhGQ_PP1P6lZ7i4XCT2hM_E';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
