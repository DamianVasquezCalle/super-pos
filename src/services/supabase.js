import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY are required.",
  );
}

/**
 * Creates a Supabase client authenticated with an Auth0 access token.
 * The token is sent as a Bearer Authorization header, which Supabase forwards
 * to Row Level Security (RLS) policies via auth.jwt().
 *
 * @param {string} accessToken - Auth0 access token from getAccessTokenSilently()
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export const createSupabaseClient = () =>
  createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
