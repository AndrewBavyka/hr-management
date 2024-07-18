import axios from 'axios';
import { type Department, type Position } from '../departments/departments';

const API_URL = 'http://localhost:3000/api';

export interface Employee {
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
    working_days: string[];
    grade: string;
    work_mail: string;
    office_location: string;
    joing_date: string;
    slack_link: string;
    telegram_link: string;
    github_link: string;
    departments: Department[];
}

export interface EmployeePersonalInfo {
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
}

export interface EmployeeProffessionalInfo {
    employee_type: string;
    departments: Department[];
    working_days: string[];
    grade: string;
    work_mail: string;
    office_location: string;
    joing_date: string;
}

export interface EmployeeAccountAccess {
    slack_link: string;
    telegram_link: string;
    github_link: string;
}

// Получение всех данных сотрудника
export const fetchEmployeeData = async (employeeId: number): Promise<Employee> => {
    try {
        const response = await axios.get(`${API_URL}/employees/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        throw error;
    }
};

// Добавление нового сотрудника
export const addEmployee = async (employee: Employee): Promise<Employee> => {
    try {
        const response = await axios.post(`${API_URL}/employees/new`, employee);
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

// Получение всех департаментов и позиций
export const fetchDepartmentsAndPositions = async (): Promise<{ departments: Department[], positions: Position[] }> => {
    try {
        const responseDepartment = await axios.get(`${API_URL}/departments`);
        const departments: Department[] = responseDepartment.data;

        const positionsResponse = await axios.get(`${API_URL}/positions`);
        const positions: Position[] = positionsResponse.data;

        return { departments, positions };
    } catch (error) {
        console.error('Error fetching departments and positions:', error);
        throw error;
    }
};

// Демо данные для проверки
export const demoFetchEmployeeData = async (): Promise<Employee> => {
    const demoEmployee: Employee = {
        user_photo: 'link-to-photo',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        date_of_birth: '1990-01-01',
        material_status: 'Single',
        mobile_number: '1234567890',
        gender: 'Male',
        nationality: 'American',
        city: 'New York',
        address: '123 Main St',
        employee_type: 'Full-time',
        working_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        grade: 'A',
        work_mail: 'john.doe@workmail.com',
        office_location: 'New York Office',
        joing_date: '2020-01-01',
        slack_link: 'link-to-slack',
        telegram_link: 'link-to-telegram',
        github_link: 'link-to-github',
        departments: [
            {
                id: 1,
                name_department: 'Development Department',
                countMembers: 2,
                positions: [
                    { id: 1, name: 'Developer', departmentId: 1 },
                    { id: 2, name: 'Senior Developer', departmentId: 1 }
                ]
            },
            {
                id: 2,
                name_department: 'Design Department',
                countMembers: 1,
                positions: [
                    { id: 3, name: 'Designer', departmentId: 2 }
                ]
            }
        ]
    };

    return new Promise((resolve) => {
        setTimeout(() => resolve(demoEmployee), 1000);
    });
};
