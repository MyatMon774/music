import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIConfig } from '../../assets/custom/api';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isShowMenu = new BehaviorSubject<boolean>(true);
  constructor(private http: HttpClient) { }
  private baseUrl = environment.apiUrl;
  private search = "https://v1.nocodeapi.com/myat7794/spotify/PjVFcxeAxDOYyAVX/search?q=";
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
}
