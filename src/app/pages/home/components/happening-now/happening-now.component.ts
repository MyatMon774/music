import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { loream } from '../../../../models/main';
import { TruncateWordsPipe } from '../../../../util/truncate-words.pipe';

@Component({
  selector: 'app-happening-now',
  standalone: true,
  imports: [CommonModule,
    TruncateWordsPipe
  ],
  templateUrl: './happening-now.component.html',
  styleUrl: './happening-now.component.scss'
})
export class HappeningNowComponent {
  loream = loream;
}
