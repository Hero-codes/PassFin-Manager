"use client";
import {
    createContext, useState, ReactNode, useContext, SetStateAction, Dispatch
} from "react";

interface UserDataType {
    id: string,
    email: string
};

interface AuthContextType {
    user: boolean | null;
    setUser: Dispatch<SetStateAction<boolean>>
    userData: UserDataType
    setUserData: Dispatch<SetStateAction<UserDataType>>
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserDataType>({
        id: "",
        email: ""
    });

    return <AuthContext.Provider value={{ user, setUser, userData, setUserData }}>
        {children}
    </AuthContext.Provider>
};

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be used within a AuthProvider"
        )
    };
    return context;
}