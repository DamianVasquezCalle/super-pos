/**
 * Fardos service — wraps Supabase queries for the Fardos table.
 * Each function receives an authenticated Supabase client from useSupabase().getClient().
 *
 * Table: Fardos
 * Columns: id, created_at, accountId, name, cost
 *
 * @param {import("@supabase/supabase-js").SupabaseClient} supabase
 */

export const getFardos = async (supabase, { page = 1, pageSize = 10 } = {}) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("Fardos")
    .select("id, created_at, accountId, name, cost", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data, count };
};

export const getFardoById = async (supabase, id) => {
  const { data, error } = await supabase
    .from("Fardos")
    .select("id, created_at, accountId, name, cost")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createFardo = async (supabase, payload) => {
  const { data, error } = await supabase
    .from("Fardos")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateFardo = async (supabase, id, payload) => {
  const { data, error } = await supabase
    .from("Fardos")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteFardo = async (supabase, id) => {
  const { error } = await supabase.from("Fardos").delete().eq("id", id);

  if (error) throw error;
};
