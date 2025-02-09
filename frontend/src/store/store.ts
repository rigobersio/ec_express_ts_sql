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
    user: null,
    token: null,
    role: null,
    setUser: (user: string | null) => set({ user }),
    setToken: (token: string | null) => set({ token }),
    setRole: (role: string | null) => set({ role }),
    products: [],
    setProducts: (products: Product[]) => set({ products }),
});

export const useStore = create<State>(createState);
