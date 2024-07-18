import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

export interface Organization {
    city_organization: string,
    office_organization: string,
}

export const fetchAllOrganization = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}/organization`);
        return response.data;
    } catch (error) {
        console.error('Error fetching organization:', error);
        throw error;
    }
};

export const addOrganization = async (organization: Organization): Promise<void> => {
    try {
        await axios.post(`${API_URL}/organization/new`, organization);
    } catch (error) {
        console.error('Error adding organization:', error);
        throw error;
    }
};

export const removeOrganizarion = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/organization/${id}`);
    } catch (error) {
        console.error('Error removing organization:', error);
        throw error;
    }
};
