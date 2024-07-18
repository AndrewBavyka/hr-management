import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

export interface Department {
    id: number;
    name_department: string;
    countMembers: number;
    positions: Position[];
}

export interface EmployeesInfo {
    id: number;
    name: string;
    position: string;
    profileLink: string;
    departmentId: number;
}

export interface Position {
    id: number;
    name: string;
    departmentId: number;
}

export interface NewDepartment {
    name_department: string;
}

export interface NewPosition {
    name: string;
    department_id: number;
}

export interface AllDepartments {
    id: number;
    name_department: string;
    countMembers: number;
    positions: Position[];
    employees: EmployeesInfo[];
}

export const fetchDepartments = async (): Promise<AllDepartments[]> => {
    try {
        const response = await axios.get(`${API_URL}/departments`);
        const departments: Department[] = response.data;

        const usersResponse = await axios.get(`${API_URL}/users`);
        const users: EmployeesInfo[] = usersResponse.data;

        const positionsResponse = await axios.get(`${API_URL}/positions`);
        const positions: Position[] = positionsResponse.data;

        return departments.map(department => {
            const departmentUsers = users.filter(user => user.departmentId === department.id);
            const departmentPositions = positions.filter(position => position.departmentId === department.id);
            return {
                ...department,
                employees: departmentUsers,
                countMembers: departmentUsers.length,
                positions: departmentPositions,
            };
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }

};

export const addDepartments = async (department: NewDepartment): Promise<Department> => {
    try {
        const response = await axios.post(`${API_URL}/departments/new`, department);
        return response.data;
    } catch (error) {
        console.error('Error adding departments:', error);
        throw error;
    }
};

export const addPosition = async (position: NewPosition): Promise<void> => {
    try {
        await axios.post(`${API_URL}/positions/new`, position);
    } catch (error) {
        console.error('Error adding position:', error);
        throw error;
    }
};

export const removeDepartments = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/departments/${id}`);
    } catch (error) {
        console.error('Error removing departments:', error);
        throw error;
    }
};

export const fetchUsers = async (): Promise<EmployeesInfo[]> => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
