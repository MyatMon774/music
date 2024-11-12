import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
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
