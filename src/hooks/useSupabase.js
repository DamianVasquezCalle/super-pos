import { useCallback } from "react";
import { createSupabaseClient } from "../services/supabase";

/**
 * Returns a `getClient()` function that resolves to a Supabase client
 * authenticated with the current Auth0 access token.
 *
 * Auth0 handles token caching and silent refresh automatically, so each call
 * to `getClient()` always receives a valid, non-expired token without extra
 * network requests when the token is still fresh.
 *
 * Usage:
 *   const { getClient } = useSupabase();
 *
 *   const fetchItems = async () => {
 *     const supabase = await getClient();
 *     const { data, error } = await supabase.from("items").select("*");
 *   };
 *
 * Supabase setup required:
 *   - In the Supabase dashboard, add Auth0 as a custom JWT provider under
 *     Project Settings → Auth → JWT Secret (use Auth0 tenant's public JWKS).
 *   - RLS policies can then reference auth.jwt() ->> 'sub' to get the Auth0 user ID.
 */
export const useSupabase = () => {
  const getClient = useCallback(() => {
    return createSupabaseClient();
  }, [createSupabaseClient]);

  return { getClient };
};
