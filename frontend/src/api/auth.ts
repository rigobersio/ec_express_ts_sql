import instanceAxios from './axiosConfig';

export const getUsers = async () => {
    try {
        const response = await instanceAxios.get('/users/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id: string) => {
    try {
        const response = await instanceAxios.get(`/users/get/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw error;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const response = await instanceAxios.get(`/users/get/email/${email}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with email ${email}:`, error);
        throw error;
    }
};

export const createUser = async (userData: any) => {
    try {
        const response = await instanceAxios.post('/users/post', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (id: string, userData: any) => {
    try {
        const response = await instanceAxios.put(`/users/put/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw error;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const response = await instanceAxios.delete(`/users/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
};
