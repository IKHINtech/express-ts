import { Job } from '@/interfaces/jobs.interdace';
import { Service } from 'typedi';
import fetch from 'node-fetch';

@Service()
export class JobService {
  public async searchJobs(description?: string, location?: string, full_time?: boolean, page?: number): Promise<Job[]> {
    // Base URL
    const baseUrl = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';

    // Constructing query parameters
    const queryParams = new URLSearchParams();

    if (description) {
      queryParams.append('description', description);
    }

    if (location) {
      queryParams.append('location', location);
    }

    if (full_time !== undefined) {
      queryParams.append('full_time', full_time.toString());
    }

    if (page !== undefined) {
      queryParams.append('page', page.toString());
    }

    // Combine base URL with query parameters
    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
      // Fetch data
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: Job[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
