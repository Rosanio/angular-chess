import { Component } from 'angular2/core';
import { ChessboardComponent } from './chessboard.component';

@Component({
  selector: 'my-app',
  directives: [ChessboardComponent],
  template: `
  <div class="container">
    <h1>Chess!</h1>
    <chess-board></chess-board>
  </div>
    `
})

export class AppComponent {

}
