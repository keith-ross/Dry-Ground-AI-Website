const SESSION_STORAGE_KEY = 'elevenlabs_session_id';

/**
 * Generate a unique session ID
 */
const generateSessionId = (): string => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Get or create session ID
 */
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
  
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    console.log('Created new session ID:', sessionId);
  }
  
  return sessionId;
};

/**
 * Clear session (for cleanup)
 */
export const clearSession = (): void => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  console.log('Session cleared');
};

/**
 * Get current session ID without creating a new one
 */
export const getCurrentSessionId = (): string | null => {
  return sessionStorage.getItem(SESSION_STORAGE_KEY);
}; 