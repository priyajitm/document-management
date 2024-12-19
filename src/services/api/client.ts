interface ApiError {
  message: string;
  status: number;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T, D>(
    method: HttpMethod,
    endpoint: string,
    data?: D
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      const responseData = response.status !== 204 
        ? await response.json().catch(() => ({}))
        : null;

      if (!response.ok) {
        throw new Error(responseData?.message || 'Unknown error');
      }

      return responseData;
    } catch (error) {
      console.error(`API Error (${method} ${endpoint}):`, error);
      throw this.normalizeError(error);
    }
  }

  private normalizeError(error: unknown): ApiError {
    if (this.isApiError(error)) {
      return error;
    }
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    };
  }

  private isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'status' in error
    );
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T, void>('GET', endpoint);
  }

  async post<T, D>(endpoint: string, data: D): Promise<T> {
    return this.request<T, D>('POST', endpoint, data);
  }

  async put<T, D>(endpoint: string, data: D): Promise<T> {
    return this.request<T, D>('PUT', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T, void>('DELETE', endpoint);
  }
}

export const apiClient = new ApiClient();