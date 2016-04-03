import { Piece } from "./piece.model";

export class Space {
  constructor(public color: string, public row: number, public column: number, public piece?: Piece){}
}
