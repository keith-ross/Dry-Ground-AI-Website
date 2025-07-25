
import { useEffect, useRef } from 'react';

interface NavigationCommand {
  type: 'navigate';
  section: string;
  pageName: string;
}

interface WebSocketMessage {
  type: string;
  sessionId?: string;
  section?: string;
  pageName?: string;
}

export const useAgentCommands = (sessionId: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxReconnectAttempts = 5;
  const reconnectAttempts = useRef(0);

  const connect = () => {
    try {
      // Use the correct WebSocket port - handle Replit's domain properly
      const isReplit = window.location.hostname.includes('replit.dev');
      const wsUrl = isReplit 
        ? `wss://${window.location.hostname.replace(/:\d+$/, '')}:3003`
        : `ws://${window.location.hostname}:3003`;
      console.log(`Connecting to WebSocket: ${wsUrl}`);
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('✅ WebSocket connected');
        reconnectAttempts.current = 0;
        
        // Register this session
        if (wsRef.current && sessionId) {
          wsRef.current.send(JSON.stringify({
            type: 'register_session',
            sessionId: sessionId
          }));
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log('📨 Received WebSocket message:', message);

          if (message.type === 'navigate' && message.section) {
            navigateToSection(message.section);
          } else if (message.type === 'session_registered') {
            console.log(`✅ Session ${message.sessionId} registered`);
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onclose = (event) => {
        console.log('🔌 WebSocket disconnected:', event.reason);
        wsRef.current = null;
        
        // Attempt to reconnect if not at max attempts
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
          console.log(`🔄 Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current}/${maxReconnectAttempts})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          console.error('❌ Max reconnection attempts reached');
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };

    } catch (error) {
      console.error('❌ Error creating WebSocket connection:', error);
    }
  };

  const navigateToSection = (sectionId: string) => {
    console.log(`🧭 Navigating to section: ${sectionId}`);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      console.log(`✅ Successfully navigated to: ${sectionId}`);
    } else {
      console.warn(`⚠️ Section not found: ${sectionId}`);
      // Try alternate IDs or classes
      const alternateElement = document.querySelector(`[data-section="${sectionId}"]`) ||
                             document.querySelector(`.${sectionId}`) ||
                             document.querySelector(`section:has([id*="${sectionId}"])`);
      
      if (alternateElement) {
        alternateElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        console.log(`✅ Found and navigated to alternate element for: ${sectionId}`);
      } else {
        console.error(`❌ Could not find any element for section: ${sectionId}`);
      }
    }
  };

  useEffect(() => {
    if (sessionId) {
      console.log(`🔌 Initializing WebSocket for session: ${sessionId}`);
      connect();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [sessionId]);

  return {
    isConnected: wsRef.current?.readyState === WebSocket.OPEN,
    navigateToSection
  };
};
