import { API_BASE_URL } from './constants';
import type { MentorRequest, MentorResponse } from '@/types/mentor';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async resolveMentor(request: MentorRequest): Promise<MentorResponse> {
    const endpoints = [
      '/api/v1/mentor',
      `${this.baseUrl}/api/v1/mentor/resolve`,
      `${this.baseUrl}/api/v1/mentor`
    ];

    let lastError: Error | null = null;

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        lastError = err instanceof Error ? err : new Error('Network failure');
      }
    }

    throw lastError || new Error('Failed to resolve mentor query');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
