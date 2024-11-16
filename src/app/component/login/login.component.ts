import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private mainService:MainService,private authService : AuthService) {
    this.mainService.isShowMenu.next(false)
  }
  redirectToSpotifyAuth() {
    window.location.href = this.authService.getAuthUrl();
    
  }
}
