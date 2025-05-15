// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Supabase URL and Anon Key from your Supabase project settings
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
