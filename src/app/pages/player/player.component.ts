import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { backgroundHover1, borderToggle, dropdownAnimation, fadeInOut, hoverEffect1, hoverEffect2, iconHover1, iconVisibility } from '../../util/animations';
import { TimeConverterPipe } from '../../util/time-converter.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, forkJoin, Observable, take } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule,FormsModule,TimeConverterPipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  animations: [borderToggle,
    dropdownAnimation,
    hoverEffect1,
    hoverEffect2,
    backgroundHover1,
    iconHover1,
    iconVisibility,
    fadeInOut
  ]
  
})
export class PlayerComponent implements OnInit{
  list: any;
  isLoading: boolean = false;
  recommendations: any;
  recentlyPlayedTracks: any;
  isInfiniteLoading: boolean = false;
  constructor(private router:Router,private mainService: MainService,private route: ActivatedRoute, private authService: AuthService){
    this.audio.src = this.currentTrack.url;
    this.audio.load();
  }
  user = {
    name: 'Joshua',
    profilePic: '../../../assets/images/profile.jpg',
    premium: true 
  };
  selectedMenu: string = 'home';  

  
  setSelectedMenu(menu: string) {
    console.log(menu)
    this.selectedMenu = menu;
    if(menu === 'songs'){
      this.SearchSongByDefault();
    }
    if(menu === 'just for you'){
      this.getRecomandation(8)
    }
    if(menu === 'top charts'){
      this.top();
    }
     
   
  }
  menuItems = [
    { id:1, name: 'home', icon: 'fa-solid fa-house' },  
    { id:2, name: 'songs', icon: 'fa-solid fa-music' },  
    { id:3, name: 'palylists', icon: 'fa-solid fa-list' }, 
    { id:4, name: 'just for you', icon: 'fa-solid fa-headphones' },
    { id:5, name: 'top charts', icon: 'fa-solid fa-chart-line' }, 
  ];


  addPlaylist() {
    
  }

  
  ngOnInit(): void {
    
    this.mainService.isShowMenu.next(false);
    
    this.loadTrack();
    
    
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgress();
    });
    this.getRecomandation(3);
    this.loadRecentlyPlayedTracks();
    this.getAllPlaylist()
  }
  player : any;
  initializeSpotifyPlayer() {
    this.accessToken = localStorage.getItem('spotify_access_token')?.toString();
    if (this.accessToken) {
      // Ensure the Spotify Web Playback SDK script is only loaded once
      if (!document.getElementById('spotify-player-sdk')) {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.id = 'spotify-player-sdk'; // Set an ID to check if the script is already loaded
        document.body.appendChild(script);
  
        // Define the callback once the script is loaded
        script.onload = () => {
          // This is where we define the global callback
          window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
              name: 'Angular Spotify Player',
              getOAuthToken: (cb:any) => {
                cb(this.accessToken);
              },
              volume: 0.5,
            });
  
            // Handle player readiness
            player.addListener('ready', ({ device_id }) => {
              console.log('The player is ready with device ID:', device_id);
            });
  
            // Handle player errors
            player.addListener('initialization_error', (e) => {
              console.error('Initialization Error:', e);
            });
            player.addListener('authentication_error', (e) => {
              console.error('Authentication Error:', e);
            });
            player.addListener('account_error', (e) => {
              console.error('Account Error:', e);
            });
            player.addListener('playback_error', (e) => {
              console.error('Playback Error:', e);
            });
  
            // Connect the player
            player.connect().then((state) => {
              if (!state.connected) {
                console.error('Failed to connect to Spotify player');
              }
            });
  
            this.player = player; // Store the player instance for later use
          };
        };
      }
    } else {
      console.log('Access token not available');
    }
  }
  
  accessToken: string | undefined = undefined;
  ngOnDestroy() {
    if (this.player) {
      this.player.disconnect();
    }
  }
  

  playTrack(trackUri: string) {
    if (this.player) {
      this.player.play({
        uris: [trackUri],
      }).then(() => {
        console.log('Playback started!');
      }).catch((error:any) => {
        console.error('Error playing track:', error);
      });
    } else {
      console.error('Player not ready');
    }
  }
  
  getRecomandation(limit:number){
   
    if(localStorage.getItem('spotify_access_token')?.toString() !== undefined ){
      
      this.mainService.getRecommendations(limit).subscribe(
        (data) => {
          this.recommendations = data.tracks;
          console.log(this.recommendations)
          
        },
        (error) => {
          console.error('Error fetching recommendations', error);
        }
      );
    }
    else{
      this.router.navigate(['login'])
    }
  }

  /* Search start */
  isInputActive = false;  
  searchQuery: string = ''; 
  toggleBorder() {
    this.isInputActive = !this.isInputActive; 
    if(this.isInputActive){
      document.getElementById('search-input')?.focus();
    }
  }
  /* Search end */
  /* notification start */
  showDropdown = false;
  notificationCount = 3;  // Example notification count

  // Simulating notification data
  notifications = [
    { profileImage: '../../../assets/images/p1.jpg', label: 'Maria like your playlist', time :'2m',span:'XD 4 Life' },
    { profileImage: '../../../assets/images/p2.jpg', label: 'Jasmine is currently listening to', time: '1hr',span:'Best of Blues'  },
    { profileImage: '../../../assets/images/p3.jpg', label: 'Marc liked your playlist', time: '5hr' ,span:'Booping at Adobe' }
  ];

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  /* notification end */

  /* two div start*/
  hoverState1: string = 'default'; 
  hoverState2: string = 'default'; 

  onMouseEnterDiv1() {
    this.hoverState1 = 'hovered';
  }

  onMouseLeaveDiv1() {
    this.hoverState1 = 'default';
  }

  // Methods to trigger hover effect for the second div
  onMouseEnterDiv2() {
    this.hoverState2 = 'hovered';
  }

  onMouseLeaveDiv2() {
    this.hoverState2 = 'default';
  }
  /*two div end*/
  /* two list start */

  items = [
    { id: 1, name:'Best of Blues',artist:'Jazzmaster Bill' },
    { id: 2, name:'Out of This World',artist:'Lily Wonders'},
    { id: 3, name:'Acoustics',artist:'The Spaceman' }
  ];
  items1 = [
    { id: 1, name:'All thar Jazz',artist:'Various Artists',time:'13:30'},
    { id: 2, name:'Splashed',artist:'Blu-Eyed D..',time:'05:12'},
    { id: 3,name:'Prism',artist:'Gus Bot',time:'03:22' },
    { id: 4,name:'Mind-blowing Beats',artist:'Various Artists',time:'09:22' },
  
  ];

  
  hoveredItemId: number | null = null;

  
  onMouseEnter(id: number): void {
    this.hoveredItemId = id;
  }

  
  onMouseLeave(): void {
    this.hoveredItemId = null;
  }

  
  isHovered(id: number): boolean {
    return this.hoveredItemId === id;
  }

  hoverStates: boolean[] = [];

  onMouseEnter1(index: number): void {
    this.hoverStates[index] = true; 
  }

  onMouseLeave1(index: number): void {
    this.hoverStates[index] = false; 
  }


  isHovered1(index: number): boolean {
    return this.hoverStates[index];
  }


  /*two list end */

  /* Player Start */
  tracks = [
    {
      title: 'I\'m Not The Only One',
      artist: 'Sam Smith & TAEYEON',
      url: '../../../assets/song/Sam Smith & TAEYEON - I\'m Not The Only One.mp3',
      albumCover: '../../../assets/images/img1.jpg'
    },
    {
      title: 'Fabulous',
      artist: 'TAEYEON',
      url: '../../../assets/song/TAEYEON - Fabulous.mp3',
      albumCover: '../../../assets/images/img2.jpg'
    },
    {
      title: 'Fine',
      artist: 'TAEYEON',
      url: '../../../assets/song/TAEYEON - Fine.mp3',
      albumCover: '../../../assets/images/img3.jpg'
    }
  ];
  
  currentTrackIndex = 0;
  audio: HTMLAudioElement = new Audio();
  isPlaying = false;
  isShuffle = false;
  isRepeat = false;
  currentTrack = this.tracks[this.currentTrackIndex];
  
  
  loadTrack() {
    this.audio.src = this.currentTrack.url;
    this.audio.load();
  }
  play(item:any){
    
    console.log(item)
    let obj = {
      title: item.name,
      artist: item.artists[0].name,
      url:item.preview_url,
      albumCover: item.album.images[0].url
    };
    
    this.currentTrack = obj;
    console.log(item.album.images[0].url)
    this.loadTrack();
    this.stopPlayback();
    this.togglePlayPause()
    
  }
  togglePlayPause() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }
  
  stopPlayback() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }
  
  playNext() {
    if (this.isShuffle) {
      // Pick a random track if shuffle is on
      this.currentTrackIndex = Math.floor(Math.random() * this.tracks.length);
    } else {
      // Otherwise, play next in sequence
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    }
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.loadTrack();
    if (this.isPlaying) {
      this.audio.play();
    }
  }
  
  playPrevious() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.loadTrack();
    if (this.isPlaying) {
      this.audio.play();
    }
  }
  
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
  }
  
  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    this.audio.loop = this.isRepeat;
  }
  
  onTrackEnd() {
    if (!this.isRepeat) {
      this.playNext();
    } else {
      this.audio.play();
    }
  }
  
  updateProgress() {
    const progressBar = document.querySelector('.progress-bar') as HTMLInputElement;
    if (progressBar) {
      progressBar.value = this.audio.currentTime.toString();
    }
  }
  
  onProgressChange(event: any) {
    this.audio.currentTime = event.target.value;
  }
  
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
/* Player End */

loadRecentlyPlayedTracks() {
  this.mainService.getRecentlyPlayedTracks().subscribe(
    (response: any) => {
      this.recentlyPlayedTracks = response.items; 
      
    },
    (error) => {
      console.error('Error fetching recently played tracks:', error);
    }
  );
}
activeColor:string = '#DA0E76'
limit : number = 20;
offset : number = 0;
total : number = 0;
obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
items$: Observable<any> = this.obsArray.asObservable();
SearchSong(event:any) {
  console.log(event)
  if(this.searchQuery !== ''){
    this.mainService.search(this.searchQuery,0,this.limit).subscribe(
      (response: any) => {
        this.list = response.tracks.items;
        this.obsArray.next(this.list);
        this.isLoading = false;
        this.total = response.tracks.total;
        console.log(response)
        this.setSelectedMenu('songsm') 
      },
      (error) => {
        console.error('Error fetching recently played tracks:', error);
      }
    );
  }
  else{
    this.setSelectedMenu('home')
  }
}
SearchSongByDefault(){
  this.mainService.search('a',0,this.limit).subscribe(
    (response: any) => {
      this.list = response.tracks.items;
      this.obsArray.next(this.list);
      this.isLoading = false;
      this.total = response.tracks.total;
      console.log(this.items$)
       
    },
    (error) => {
      console.error('Error fetching recently played tracks:', error);
    }
  );
}
onScroll(event: any): void {
  const element = event.target;
  const scrollTop = element.scrollTop;
  const clientHeight = element.clientHeight;
  const scrollHeight = element.scrollHeight;
  console.log(scrollHeight - Math.ceil(scrollTop + clientHeight))
  console.log(this.offset*this.limit)
  if (scrollHeight - Math.ceil(scrollTop + clientHeight) < 20 && this.offset*this.limit <= this.total && !this.isInfiniteLoading) {
    
    this.isInfiniteLoading = true;
      this.offset = 1 + this.offset;
      forkJoin([this.items$.pipe(take(1)),  this.mainService.search(this.searchQuery,this.offset,this.limit)]).subscribe((data: any) => {
        const newArr = [...data[0], ...data[1].tracks.items];
        this.obsArray.next(newArr);
        this.isInfiniteLoading = false;
      });
  }
  else if(scrollHeight - Math.ceil(scrollTop + clientHeight) === 0 && this.offset*this.limit > this.total && !this.isInfiniteLoading){
    this.isInfiniteLoading = true;
    setTimeout(() => {
      this.isInfiniteLoading = false;
    }, 1000);
  }
 
}
onScroll1(event: any): void {
  const element = event.target;
  const scrollTop = element.scrollTop;
  const clientHeight = element.clientHeight;
  const scrollHeight = element.scrollHeight;
  console.log(scrollHeight - Math.ceil(scrollTop + clientHeight))
  console.log(this.offset*this.limit)
  if (scrollHeight - Math.ceil(scrollTop + clientHeight) < 20 && this.offset*this.limit <= this.total && !this.isInfiniteLoading) {
    
    this.isInfiniteLoading = true;
      this.offset = 1 + this.offset;
      forkJoin([this.items$.pipe(take(1)),  this.mainService.top(this.limit,this.offset)]).subscribe((data: any) => {
        const newArr = [...data[0], ...data[1].tracks.items];
        this.obsArray.next(newArr);
        this.isInfiniteLoading = false;
      });
  }
  else if(scrollHeight - Math.ceil(scrollTop + clientHeight) === 0 && this.offset*this.limit > this.total && !this.isInfiniteLoading){
    this.isInfiniteLoading = true;
    setTimeout(() => {
      this.isInfiniteLoading = false;
    }, 1000);
  }
 
}
playlists:any;
getAllPlaylist() {
  
    this.mainService.allPlaylist().subscribe(
      (response: any) => {
        this.playlists  = response.items
        console.log(this.playlists)
      },
      (error) => {
        console.error('Error fetching recently played tracks:', error);
      }
    );
 
}
top(){
  this.mainService.top(this.limit,this.offset).subscribe(
    (response: any) => {
      this.list = response.playlists.items;
      this.obsArray.next(this.list);
      this.isLoading = false;
      this.total = response.playlists.total;
      console.log(this.list)
     
    },
    (error) => {
      console.error('Error fetching recently played tracks:', error);
    }
  );
}
}
