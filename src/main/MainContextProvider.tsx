import React from "react";

export type User = {
    //userId: string;
    email: string;
    userRole: string;
    //token: string;
};

type MainContextType = {
    info: {
      date: string;
      time: string;
      value: string;
    };
    setInfo: (info: { date: string; time: string; value: string }) => void;
    userIsLogged?: boolean;
    user?: User;
    setUser: (user: User | undefined) => void;
    setUserIsLogged: (isLogged: boolean) => void;
  };

const defaultValue: MainContextType = {
    info: {
      date: "",
      time: "",
      value: "",
    },
    setInfo: () => {},
    userIsLogged: false,
    user: undefined,
    setUser: () => {},
    setUserIsLogged: () => {}
  };

export const MainContext = React.createContext(defaultValue);
