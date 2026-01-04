import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://cvftbqgniazflaobeheq.supabase.co";
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZnRicWduaWF6Zmxhb2JlaGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NjczNjYsImV4cCI6MjA4MzA0MzM2Nn0.aI-RUd58w56ZWuBM5WjxydWIQU8mYdWw1N1mbVqc50o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
