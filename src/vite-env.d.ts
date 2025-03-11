/// <reference types="vite/client" />

interface Window {
  reb2b?: {
    [key: string]: any;
    disabled?: boolean;
    methods?: string[];
    factory?: (method: string) => Function;
    load?: (key: string) => void;
    identify?: (...args: any[]) => any;
    collect?: (...args: any[]) => any;
  };
  trackingDisabled?: boolean;
  VG_CONFIG?: {
    [key: string]: any;
  };
}
