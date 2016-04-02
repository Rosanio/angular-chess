import { Component } from 'angular2/core';
import { Space } from './space.model';

@Component({
  selector: 'chess-board',
  template: `
    <button (click)="generateBoard()">Go!</button>
    <div class="chessboard" *ngIf="launchedGame">
      <p>it wrks</p>
    </div>
  `
})

export class ChessboardComponent {
  public spaces: Space[] = [];
  public launchedGame: boolean = false;
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

}
