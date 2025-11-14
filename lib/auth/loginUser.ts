import { supabase } from "../SupabaseClient";
import { Session } from "@supabase/supabase-js";

type LoginResult =
  | { session: Session; error?: undefined }
  | { error: string; session?: undefined };

const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login error:", error.message);
      return { error: error?.message };
    }
    if (!data.session) {
      console.log("No Session", data.session);
      return { session: data.session };
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "Something went wrong" };
  }
};

export default loginUser;
