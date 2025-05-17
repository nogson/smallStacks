import { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // const fetchSession = async () => {
    //   const { data, error } = await supabase.auth.getSession();
    //   setUser(data.session?.user || null);
    // };

    // fetchSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      //console.log(_event, session);
      setUser(session?.user || null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return user;
};
