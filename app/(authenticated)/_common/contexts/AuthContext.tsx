"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

type AuthContextType = {
  userId: string;
};

const AuthContext = createContext<AuthContextType>({
  userId: "",
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>();
  const supabase = createClient();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUserId(session?.user?.id);
  };

  if (!userId) {
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ userId: userId }}>
      {children}
    </AuthContext.Provider>
  );
}
