import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
  standalone:true
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService,private router:Router,
    private mainService:MainService
  ) {}

  ngOnInit(): void {
    this.mainService.isShowMenu.next(false)
    this.route.fragment.subscribe((fragment:any) => {
    
      const accessToken = this.authService.parseAccessTokenFromUrl(fragment);
      if (accessToken) {
        // Store the access token (e.g., in localStorage or a service)
        localStorage.setItem('spotify_access_token', accessToken);
      }
    });
  }
  GoToPlayer(){
    this.router.navigate(['player'])
  }
}
