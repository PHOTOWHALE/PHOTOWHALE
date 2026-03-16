import { sendGAEvent } from '@next/third-parties/google';

type EventParams = Record<string, unknown>;

export interface Analytics {
  track: (event: string, params?: EventParams) => void;
}

export const analytics: Analytics = {
  track(event, params) {
    try {
      if (params) {
        sendGAEvent('event', event, params);
      } else {
        sendGAEvent('event', event);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('GA track failed:', error);
      }
    }
  },
};
