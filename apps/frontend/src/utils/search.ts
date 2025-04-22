import { Company, CompanyFilters } from '@clay-smart-search/shared';

const API_URL = "https://citadel-agent-128d0560d7b1.herokuapp.com"; 
// const API_URL = 'http://localhost:3001';

export async function searchCompanies(filters: CompanyFilters): Promise<Company[]> {
    try {
        const response = await fetch(`${API_URL}/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filters })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as Company[];
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
}
