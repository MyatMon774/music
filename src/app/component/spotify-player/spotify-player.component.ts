import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss'],
  standalone: true
})
export class SpotifyPlayerComponent implements OnInit, OnDestroy {
  //private player!: Spotify.Player;
  private accessToken!: string;
  private refreshToken!: string;

  constructor(private authService: SpotifyAuthService) { }

  ngOnInit(): void {
    // Get the access token from URL parameters (after user is redirected back from Spotify)
    // window.onSpotifyWebPlaybackSDKReady = () => {
    //   console.log("Spotify Web Playback SDK is ready!");
    //   const code = new URLSearchParams(window.location.search).get('code');
    //   if (code) {
    //     this.authService.getAccessToken(code).subscribe(data => {
    //       this.accessToken = data.access_token;
    //       this.initializeSpotifyPlayer();
    //     });
    //   }
    // };
   
  }

  ngOnDestroy(): void {
    // // Clean up the player when component is destroyed
    // if (this.player) {
    //   this.player.disconnect();
    // }
  }

  initializeSpotifyPlayer(): void {
    // this.player = Spotify.Player({
    //   name: 'Angular Spotify Player',
    //   getOAuthToken: (cb:any) => { cb(this.accessToken); },
    //   volume: 0.5
    // });

    // Connect the player
    // this.player.connect().then((success:any) => {
    //   if (success) {
    //     console.log('Spotify player connected');
    //   } else {
    //     console.error('Failed to connect to Spotify player');
    //   }
    // });

    // // Listen for player state changes
    // this.player.on('player_state_changed', (state:any) => {
    //   console.log(state);
    // });
  }

  playSong(uri: string): void {
    // this.player.play({
    //   uris: [uri]  // Play the specific track (example: spotify:track:TRACK_ID)
    // }).then(() => {
    //   console.log('Track is playing');
    // }).catch((err:any) => {
    //   console.error('Error playing track', err);
    // });
  }

  refreshTokenIfNeeded(): void {
    const currentTime = Date.now();
    const tokenExpirationTime = 3600 * 1000; // Example expiration time (in ms)
    
    if (currentTime >= tokenExpirationTime) {
      // Refresh the token if it's expired
      this.authService.refreshAccessToken(this.refreshToken).subscribe(data => {
        this.accessToken = data.access_token;
        this.initializeSpotifyPlayer();
      });
    }
  }
}
