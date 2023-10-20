import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    user: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<string>("");

    return <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
};