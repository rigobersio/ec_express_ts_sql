import { StateCreator, create } from 'zustand';

interface State {
    user: string | null;
    token: string | null;
    role: string | null;
    setUser: (user: string | null) => void;
    setToken: (token: string | null) => void;
    setRole: (role: string | null) => void;
    products: Product[];
    setProducts: (products: Product[]) => void;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

const createState: StateCreator<State> = (set) => ({
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    setUser: (user: string | null) => {
        localStorage.setItem('user', user || '');
        set({ user });
    },
    setToken: (token: string | null) => {
        localStorage.setItem('token', token || '');
        set({ token });
    },
    setRole: (role: string | null) => {
        localStorage.setItem('role', role || '');
        set({ role });
    },
    products: [],
    setProducts: (products: Product[]) => set({ products }),
});

export const useStore = create<State>(createState);
