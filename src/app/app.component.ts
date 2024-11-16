import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MainService } from './services/main.service';
import { SpotifyPlayerComponent } from './component/spotify-player/spotify-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SpotifyPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyApp';
  isShowMenu: boolean = false;


  ngOnInit(): void {
   
    this.mainService.isShowMenu.subscribe(val=>{
      this.isShowMenu = val;
    })
  }
  constructor(private mainService:MainService) {}
  
}
