declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL?: string;
    NEXT_PUBLIC_APP_URL?: string;
    NEXT_PUBLIC_GA_ID?: string;
  }
}

interface Window {
  gtag?: (
    command: 'event' | 'config' | 'js',
    targetIdOrName: string | Date,
    params?: Record<string, unknown>,
  ) => void;
}
