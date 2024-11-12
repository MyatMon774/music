import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { loream } from '../../../../models/main';
import { TruncateWordsPipe } from '../../../../util/truncate-words.pipe';
let nextId: number = 0;
@Component({
  selector: 'app-more-new',
  standalone: true,
  imports: [CommonModule,
    TruncateWordsPipe
  ],
  templateUrl: './more-new.component.html',
  styleUrl: './more-new.component.scss',
  animations:[
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class MoreNewComponent {
  current = 0;
  list = [
    [{title:'travel',content:loream,min:'2 min ago'},
    {title:'technology',content:loream,min:'3 min ago'}],
    [{title:'art',content:loream,min:'2 min ago'},
      {title:'business',content:loream,min:'3 min ago'}]
  ];

  ngOnInit() {
   
  }

  next(){
    if(this.current<this.list.length){
      this.current = ++this.current % this.list.length;
    }
    
  }
  previous(){
    if(this.current > 0){
      this.current = (--this.current + this.list.length) % this.list.length;
    }
  }
}
