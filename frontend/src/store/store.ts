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
    user: localStorage.getItem('user'), // Inicializamos la propiedad user con el valor almacenado en localStorage
    token: localStorage.getItem('token'), // Inicializamos la propiedad token con el valor almacenado en localStorage
    role: localStorage.getItem('role'), // Inicializamos la propiedad role con el valor almacenado en localStorage
    
    setUser: (user: string | null) => {
      localStorage.setItem('user', user || ''); // Almacenamos el valor de user en localStorage
      set({ user }); // Actualizamos el estado global con el nuevo valor de user
    },
    
    setToken: (token: string | null) => {
      localStorage.setItem('token', token || ''); // Almacenamos el valor de token en localStorage
      set({ token }); // Actualizamos el estado global con el nuevo valor de token
    },
    
    setRole: (role: string | null) => {
      localStorage.setItem('role', role || ''); // Almacenamos el valor de role en localStorage
      set({ role }); // Actualizamos el estado global con el nuevo valor de role
    },
    
    products: [], // Inicializamos la propiedad products como un arreglo vacío
    
    setProducts: (products: Product[]) => set({ products }), // Método para actualizar la lista de productos
  });

export const useStore = create<State>(createState);
