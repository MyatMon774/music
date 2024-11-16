import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  private clientId = 'YOUR_SPOTIFY_CLIENT_ID';
  private clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
  private redirectUri = 'YOUR_REDIRECT_URI'; // Example: http://localhost:4200/callback
  private authUrl = 'https://accounts.spotify.com/authorize';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(private http: HttpClient) { }

  // Step 1: Redirect to Spotify's authentication URL
  getAuthUrl(): string {
    const scope = 'user-read-playback-state user-modify-playback-state streaming';
    const responseType = 'code';
    return `${this.authUrl}?client_id=${this.clientId}&response_type=${responseType}&redirect_uri=${this.redirectUri}&scope=${scope}`;
  }

  // Step 2: Exchange the authorization code for an access token
  getAccessToken(code: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri);

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.tokenUrl, body, { headers });
  }

  // Step 3: Refresh the token
  refreshAccessToken(refreshToken: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.tokenUrl, body, { headers });
  }
}
