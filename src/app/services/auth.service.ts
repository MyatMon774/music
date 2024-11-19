import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '1d40a77935fd41cf90c4e645953fbbed';
  private clientSecret = '6bd6b07044664675a9be8fb32dbb9266';
  private redirectUri = 'http://localhost:4200/callback'; // Replace with your app's redirect URI
  private authUrl = 'https://accounts.spotify.com/authorize';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(private http: HttpClient) {}

  // Step 1: Redirect to Spotify's Authorization Endpoint
  getAuthUrl(): string {
    const scopes = 'user-top-read user-library-read playlist-read-private user-read-playback-state user-modify-playback-state streaming user-read-recently-played';  // Adjust scope as needed
    return `${this.authUrl}?response_type=token&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  }

  // Step 2: Retrieve the access token from the URL fragment after redirect
  parseAccessTokenFromUrl(url: string): string {
    console.log("url",url)
    const params = url.split('&');
    const token = params[0].split('=')
    console.log(token)
    return  token[1];
  }
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
  // Step 3: Use the token to make API calls
  fetchToken(code: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
    const body = new HttpParams().set('grant_type', 'authorization_code')
                                 .set('code', code)
                                 .set('redirect_uri', this.redirectUri);
    
    return this.http.post<any>(this.tokenUrl, body.toString(), { headers });
  }
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
