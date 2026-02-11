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

declare module 'libheif-js/wasm-bundle' {
  export interface HeifImage {
    get_width(): number;
    get_height(): number;
    display(
      target: { data: Uint8ClampedArray; width: number; height: number },
      callback: (result: { data: Uint8ClampedArray; width: number; height: number } | null) => void,
    ): void;
  }

  export class HeifDecoder {
    decode(buffer: ArrayBuffer): HeifImage[];
  }
}
