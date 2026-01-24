import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://cvftbqgniazflaobeheq.supabase.co";

const SUPABASE_ANON_KEY = 'sb_publishable_-zxvV8pHXN4om4U22cpvWg_ELs2zqcO';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
