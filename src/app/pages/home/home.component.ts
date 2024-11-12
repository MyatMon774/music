
import { Component, OnInit } from '@angular/core';
import { CoverComponent } from './components/cover/cover.component';
import { MoreNewComponent } from './components/more-new/more-new.component';
import { TrendingComponent } from './components/trending/trending.component';
import { HappeningNowComponent } from './components/happening-now/happening-now.component';
import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CoverComponent,
    MoreNewComponent,
    TrendingComponent,
    HappeningNowComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private mainService:MainService){
    
  }
  ngOnInit(): void {
    this.mainService.isShowMenu.next(true)
  }
}
