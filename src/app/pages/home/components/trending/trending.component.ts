import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loream } from '../../../../models/main';
import { TruncateWordsPipe } from '../../../../util/truncate-words.pipe';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule,
    TruncateWordsPipe
  ],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent {
  loream = loream;
  current = 0;
  
}
