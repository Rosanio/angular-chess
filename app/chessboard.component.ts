/*TODO


  restrict piece movement based on type

  add player switching functionality

  build out ui to give indications about whose turn it is, and errors if invalid move is made

  add win conditions

  add check logic
*/


import { Component } from 'angular2/core';
import { Space } from './space.model';
import { Piece } from './piece.model';
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
  public pieces: Piece[] = [];
  public launchedGame: boolean = false;
  public firstClick: boolean = false;
  public selectedSpace: Space;
  public selectedPiece: Piece;
  constructor() {};
  generateBoard() {
    for(var i = 0; i < 8; i++) {
      for(var j = 0; j < 8; j++) {
        if((i+j)%2===0) {
          var newSpace = new Space("white", i, j);
          this.generatePieces(newSpace, i, j);
          this.spaces.push(newSpace);
        } else {
          var newSpace = new Space("black", i, j);
          this.generatePieces(newSpace, i, j);
          this.spaces.push(newSpace);
        }
      }
    }
    console.log(this.spaces);
    this.launchedGame = true;
  }
  generatePieces(space: Space, i: number, j: number) {
    if(i===1) {
      this.generatePawn(space, "white");
    } else if (i === 6) {
      this.generatePawn(space, "black");
    } else if (i===0) {
      this.generateNonPawns(space, "white", i, j);
    } else if (i===7) {
      this.generateNonPawns(space, "black", i, j);
    }
  }
  generateNonPawns(space: Space, color: string, i: number, j: number) {
    if(j===0 || j===7) {
      this.generateRook(space, color);
    } else if (j===1 || j===6) {
      this.generateKnight(space, color);
    } else if (j===2 || j===5) {
      this.generateBishop(space, color);
    } else if (j===3) {
      this.generateQueen(space, color);
    } else if (j===4) {
      this.generateKing(space, color);
    }
  }
  generatePawn(space: Space, color: string) {
    var newPiece = new Piece("pawn", color, "P");
    space.piece = newPiece;
    this.pieces.push(newPiece);
  }
  generateRook(space: Space, color: string) {
    var newPiece = new Piece("rook", color, "R");
    space.piece = newPiece;
    this.pieces.push(newPiece);
  }
  generateKnight(space: Space, color: string) {
    var newPiece = new Piece("knight", color, "Kn");
    space.piece = newPiece;
    this.pieces.push(newPiece);
  }
  generateBishop(space: Space, color: string) {
    var newPiece = new Piece("bishop", color, "B");
    space.piece = newPiece;
    this.pieces.push(newPiece);
  }
  generateQueen(space: Space, color: string) {
    var newPiece = new Piece("queen", color, "Q");
    space.piece = newPiece;
    this.pieces.push(newPiece);
  }
  generateKing(space: Space, color: string) {
    var newPiece = new Piece("king", color, "K");
    space.piece = newPiece;
    this.pieces.push(newPiece);
  }
  selectSpace(clickedSpace: Space) {
    if(this.firstClick) {
      if(!clickedSpace.piece || (clickedSpace.piece.color !== this.selectedPiece.color)) {
        if(this.selectedPiece.name === "pawn" && this.legitPawnMove(this.selectedSpace, clickedSpace, this.selectedPiece.color)) {
          clickedSpace.piece = this.selectedPiece;
          this.selectedSpace.piece = undefined;
        }
      }
      this.selectedSpace = undefined;
      this.selectedPiece = undefined;
      this.firstClick = false;
    } else {
      if(clickedSpace.piece) {
        this.selectedSpace = clickedSpace;
        this.selectedPiece = clickedSpace.piece;
        this.firstClick = true;
      }
    }
  }
  legitPawnMove(currentSpace: Space, moveSpace:Space, color: string) {
    if(color==="white") {
      if(currentSpace.row===1){
        if(moveSpace.row <= 3 && moveSpace.row > 1 && moveSpace.column === currentSpace.column && !moveSpace.piece) {
          return true;
        } else if (moveSpace.row === 2 && (moveSpace.column === currentSpace.column+1 || moveSpace.column === currentSpace.column-1) && moveSpace.piece) {
          return true;
        } else {
          return false;
        }
      } else {
        if(moveSpace.row === currentSpace.row+1 && moveSpace.column === currentSpace.column && !moveSpace.piece) {
          return true;
        } else if (moveSpace.row === currentSpace.row+1 && (moveSpace.column === currentSpace.column+1 || moveSpace.column === currentSpace.column-1) && moveSpace.piece) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      if(currentSpace.row===6){
        if(moveSpace.row >= 4 && moveSpace.row < 6 && moveSpace.column === currentSpace.column && !moveSpace.piece) {
          return true;
        } else if (moveSpace.row === 5 && (moveSpace.column === currentSpace.column+1 || moveSpace.column === currentSpace.column-1) && moveSpace.piece) {
          return true;
        } else {
          return false;
        }
      } else {
        if(moveSpace.row === currentSpace.row-1 && moveSpace.column === currentSpace.column && !moveSpace.piece) {
          return true;
        } else if (moveSpace.row === currentSpace.row-1 && (moveSpace.column === currentSpace.column+1 || moveSpace.column === currentSpace.column-1) && moveSpace.piece) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

}
