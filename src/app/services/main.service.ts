import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIConfig } from '../../assets/custom/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isShowMenu = new BehaviorSubject<boolean>(true);
  constructor(private http: HttpClient,private router:Router) { }
  private baseUrl = environment.apiUrl;
  private tracks = 'https://v1.nocodeapi.com/myat7794/spotify/PjVFcxeAxDOYyAVX/tracks?ids=11dFghVXANMlKmJXsNCbNl'
  private url = 'https://v1.nocodeapi.com/myat7794/spotify/PjVFcxeAxDOYyAVX/search?q=taylor';
  private remondation = 'https://v1.nocodeapi.com/myat7794/spotify/PjVFcxeAxDOYyAVX/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical,country&seed_tracks=0c6xIDDpzE81m2q797ordA'
  
  searchData(artistName: string,page:number): Observable<any> {
    const url = this.search+artistName +'&type=track&perPage=10&page='+page;
    return this.http.get<any>(url);
  }
  getRecomandation(): Observable<any> {
    const url = this.remondation;
    return this.http.get<any>(url);

  }
  
  getTracks(): Observable<any> {
    const url = this.tracks;
    return this.http.get<any>(url);
  }
  // Get album details by artist ID
  getAlbumsByArtist(artistId: string): Observable<any> {
    const url = `${this.baseUrl}album.php?i=${artistId}`;
    return this.http.get<any>(url);
  }

  // Get track details by album ID
  getTracksByAlbum(albumId: string): Observable<any> {
    const url = `${this.baseUrl}track.php?m=${albumId}`;
    return this.http.get<any>(url);
  }

  private apiUrl = 'https://api.spotify.com/v1/recommendations';

  

  getRecommendations(limit:number): Observable<any> {
    const accessToken = localStorage.getItem('spotify_access_token');
    
    if (!accessToken) {
      throw new Error('No access token found!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    
    const params = {
      seed_genres: 'pop,rock',  // Example of seed genres
      limit: limit,  // Number of recommendations
    };

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      catchError((error: any) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );;
  }
// Get the current user's playlists
getUserPlaylists(token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.apiUrl}/me/playlists`, { headers });
}

// Get details of a specific track
getTrackDetails(token: string, trackId: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.apiUrl}/tracks/${trackId}`, { headers });
}

// Search for tracks
searchTracks(token: string|undefined, query: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.apiUrl}/search`, {
    headers,
    params: {
      q: query,
      type: 'track',
      limit: '10',
    },
  });
}
private recent = 'https://api.spotify.com/v1/me/player/recently-played?limit=5'; 
getRecentlyPlayedTracks(): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}` 
  });

  return this.http.get(this.recent, { headers });
}  

search(query:string='a',offset:number,limit:number): Observable<any> {
  const searchUrl = 'https://api.spotify.com/v1/search?q='+query+'?offset='+offset+'&limit='+limit+'&type=track';
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}` 
  });

  return this.http.get(searchUrl, { headers });
}
private playlist = 'https://api.spotify.com/v1/me/playlists'
allPlaylist(){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}` 
  });

  return this.http.get(this.playlist, { headers });
}


top(limit:number,offset:number): Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('spotify_access_token')}` 
  });

  return this.http.get('https://api.spotify.com/v1/browse/featured-playlists?limit='+limit, { headers });
}
}
