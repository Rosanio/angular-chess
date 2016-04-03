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
      <p *ngIf="space.piece"
        [class.whitePiece]="space.piece.color==='white'"
        [class.blackPiece]="space.piece.color==='black'">
      {{ space.piece.symbol }}</p>
    </div>
  `
})

export class BoardSpaceComponent {
  public space: Space;
  public selected: boolean;
  selectSpace() {
    console.log(this.space);
  }
}
