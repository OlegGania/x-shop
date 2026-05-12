import { supabase } from "@/shared/api/supabaseClient";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";

export async function signUp(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse["data"]> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) throw error;

  if (data?.user) {
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      name,
      email,
    });

    if (profileError) {
      console.error("PROFILE INSERT ERROR:", profileError);
      throw profileError;
    }
  }

  return data;
}

export async function signIn(
  email: string,
  password: string,
): Promise<AuthTokenResponsePassword["data"]> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
