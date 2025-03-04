
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
