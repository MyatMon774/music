// src/spotify-web-playback.d.ts

declare namespace Spotify {
    class Player {
      constructor(options: {
        name: string;
        getOAuthToken: (cb: (token: string) => any) => any;
        volume: number;
      });
  
      connect(): Promise<{ connected: boolean }>;
  
      play(options: { uris: string[] }): any;
  
      disconnect(): any;
  
      addListener(event: string, callback: (...args: any[]) => any): any;
    }
  }
  