
/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  smsConsent: boolean;
}

/**
 * API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
