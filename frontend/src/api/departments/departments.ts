import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Department {
    id: number;
    name: string;
    positions: Position[];
}

export interface EmployeesInfo {
    id: string;
    user_photo: string;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    material_status: string;
    mobile_number: string;
    gender: string;
    nationality: string;
    city: string;
    address: string;
    employee_type: string;
    working_days: string;
    grade: string;
    work_mail: string;
    office_location: string;
    joing_date: string;
    department: string;
    position: string;
    slack_link: string;
    telegram_link: string;
    github_link: string;
}

export interface Position {
    name: string;
}

export interface AllDepartments {
    name_department: string;
    countMembers: number;
    employees: EmployeesInfo[];
}

export const fetchDepartments = async (): Promise<AllDepartments[]> => {
    try {
        const departmentsResponse = await axios.get(`${API_URL}/departments`);
        const departmentsData: any[] = departmentsResponse.data;

        const employeesResponse = await axios.get(`${API_URL}/employees`);
        const employeesData: EmployeesInfo[] = employeesResponse.data;

        const departments: AllDepartments[] = departmentsData.map(department => {
            const departmentEmployees = employeesData.filter(employee => employee.department === department.department.name);
            return {
                name_department: department.department.name,
                countMembers: departmentEmployees.length,
                employees: departmentEmployees
            };
        });
        
        return departments;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const addDepartmentsWithPositions = async (department: { name: string }, positions: { name: string }[]): Promise<Department> => {
    try {
        const response = await axios.post(`${API_URL}/departments`, { department, positions });
        return response.data;
    } catch (error) {
        console.error('Error adding department with positions:', error);
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

export const fetchEmployees = async (): Promise<EmployeesInfo[]> => {
    try {
        const response = await axios.get(`${API_URL}/employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
