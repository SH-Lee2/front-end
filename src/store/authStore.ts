import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface User {
	no: number;
	id: string;
	type: string;
	nickname: string;
	sns:boolean;
}

interface UserState {
	userProfile: User | null;
	token: string | null;
	addUser: (user: User, token: string) => void;
	updateUser:(nickname:string,userProfile:User)=>void;
	removeUser: () => void;
}


// 따로 타입 지정은 나중에

const authStore = create<UserState>()(
	devtools(
		persist((set) => ({
			userProfile: null,
			token: null,
			addUser: (user: User, token: string) =>
				set({ userProfile: user, token }),
			updateUser:(nickname:string, userProfile:User) => set({userProfile: {...userProfile, nickname}}),
			removeUser: () => set({ userProfile: null, token: null }),
		}),{name : "user"})
	)
	
);


export default authStore;
