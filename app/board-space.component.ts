import { Component } from 'angular2/core';
import { Space } from './space.model';

@Component({
  selector: 'board-space',
  inputs: ['space', 'selected'],
  template: `
    <div class="space"
      [class.white]="space.color==='white'"
      [class.black]="space.color==='black'"
      (click)="selectSpace()">
    </div>
  `
})

export class BoardSpaceComponent {
  public space: Space;
  public selected: boolean;
  selectSpace() {
    console.log(this.selected);
  }
}