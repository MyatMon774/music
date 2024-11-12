import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  currentRoute: string = '';
  isMenuOpen = false;
  isShowMenu = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private activatedRoute: ActivatedRoute,private mainService:MainService) { }

  ngOnInit(): void {
   
    this.mainService.isShowMenu.subscribe(val=>{
      this.isShowMenu = val;
    })
  }

  
}
