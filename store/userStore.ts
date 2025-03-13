import { User } from "next-auth";
import { create } from "zustand";

type UserStore = {
  userData: User;
  setUserData: (data: Partial<User>) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userData: {
    name: "",
    email: "",
    image: "",
    role: "",
  },
  setUserData: (data) => {
    console.log("Data received in store: ", data);
    return set((state) => ({
      userData: {
        ...state.userData,
        ...data,
      },
    }));
  },
}));
