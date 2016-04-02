import { Component } from 'angular2/core';
import { Space } from './space.model';
import { BoardSpaceComponent } from './board-space.component';

@Component({
  selector: 'chess-board',
  directives: [BoardSpaceComponent],
  template: `
    <button (click)="generateBoard()">Go!</button>
    <div class="chessboard" *ngIf="launchedGame">
      <div *ngFor="#currentSpace of spaces">
        <board-space [space]="currentSpace" [selected]="firstClick"
        [class.selected]="currentSpace === selectedSpace" (click)="selectSpace(currentSpace)"></board-space>
      </div>
    </div>
  `
})

export class ChessboardComponent {
  public spaces: Space[] = [];
  public launchedGame: boolean = false;
  public firstClick: boolean = false;
  public selectedSpace: Space;
  constructor() {};
  generateBoard() {
    var columnNames = ["A","B","C","D","E","F","G","H"];
    for(var i = 0; i < 8; i++) {
      for(var j = 0; j < 8; j++) {
        if((i+j)%2===0) {
          var newSpace = new Space("white", i, columnNames[j]);
          this.spaces.push(newSpace);
        } else {
          var newSpace = new Space("black", i, columnNames[j]);
          this.spaces.push(newSpace);
        }
      }
    }
    this.launchedGame = true;
  }
  selectSpace(clickedSpace: Space) {
    if(this.firstClick) {
      this.selectedSpace = undefined;
      this.firstClick = false;
    } else {
      this.selectedSpace = clickedSpace;
      this.firstClick = true;
    }
  }

}
