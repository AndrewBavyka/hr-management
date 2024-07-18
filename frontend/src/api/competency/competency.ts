import axios from 'axios';

const API_URL = 'http://localhost:3000/api';


export interface Competency {
    id: number;
    name: string;
    level: number;
}

export const fetchDepartments = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}/departments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};


export const generateReport = async (departmentId: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/departments/${departmentId}/report`);
        return response.data;
    } catch (error) {
        console.error('Error generating report:', error);
        throw error;
    }
};


export const fetchCompetencies = async (): Promise<Competency[]> => {
    try {
        const response = await axios.get(`${API_URL}/competencies`);
        return response.data;
    } catch (error) {
        console.error('Error fetching competencies:', error);
        throw error;
    }
};

export const addCompetency = async (competency: { name: string }): Promise<void> => {
    try {
        await axios.post(`${API_URL}/competencies`, competency);
    } catch (error) {
        console.error('Error adding competency:', error);
        throw error;
    }
};

export const removeCompetency = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/competencies/${id}`);
    } catch (error) {
        console.error('Error removing competency:', error);
        throw error;
    }
};
