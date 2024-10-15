"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

type AuthContextType = {
  userId: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      console.log(user?.id);
      setUserId(user?.id || null);
      setIsLoading(false);
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id || null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <AuthContext.Provider value={{ userId, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
