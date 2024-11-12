import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { backgroundHover1, borderToggle, dropdownAnimation, fadeInOut, hoverEffect1, hoverEffect2, iconHover1, iconVisibility } from '../../util/animations';
import { TimeConverterPipe } from '../../util/time-converter.pipe';

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
  constructor(private mainService: MainService){
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
    this.selectedMenu = menu;
  }
  menuItems = [
    { id:1, name: 'home', icon: 'fa-solid fa-house' },  
    { id:2, name: 'songs', icon: 'fa-solid fa-music' },  
    { id:3, name: 'palylists', icon: 'fa-solid fa-list' }, 
    { id:4, name: 'just for you', icon: 'fa-solid fa-headphones' },
    { id:5, name: 'top charts', icon: 'fa-solid fa-chart-line' }, 
  ];
  playlists: string[] = ['WorkOut Mix','Chillin\' at Home','Bopping at Adobe','AD 4 Life']; 

  addPlaylist() {
    const newPlaylist = `Playlist ${this.playlists.length + 1}`;
    this.playlists.push(newPlaylist); 
  }

  
  ngOnInit(): void {
    this.mainService.isShowMenu.next(false);
    //this.getRecomendation();
    this.loadTrack();
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgress();
    });
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
    console.log(item.album.images[0].url)
    let obj = {
      title: item.name,
      artist: item.artists[0].name,
      url:item.preview_url,
      albumCover: item.album.images[0].url
    };
    
    this.currentTrack = obj;
    console.log(this.currentTrack)
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
getRecomendation(){
  this.mainService.getRecomandation().subscribe((res)=>{
    console.log(res)
  })
}
isLoading:boolean = false;
searchData(page:number){
  
  this.isLoading = true;
  if(this.searchQuery !== ''){
    this.setSelectedMenu('songs')
    this.mainService.searchData(this.searchQuery,page).subscribe((res)=>{
      console.log(res)
      this.list = res.tracks.items;
      this.isLoading = false;
      this.ngOnInit();
      console.log(this.list)
    })
  }
  else{
    this.setSelectedMenu('home')
  }
 
}


}
