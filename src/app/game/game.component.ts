import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  constructor(public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.newGame();
  }
  pickCard(){
    if (this.game.stack.length == 0){
      this.endGame()
         }
    else{


      if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();     // this.game.stack.pop() nimmt die letzte Karte vom Array Stack und löscht sie gleichzeitig.
      this.pickCardAnimation = true;
      
      console.log(this.game)
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard)
        this.pickCardAnimation = false;     // setzen Animation zurück, damit die Animation bei jeder Karte zurück gesetzt wird.
      }, 1200);
    }

    
    } 
  }

  newGame(){
    this.game = new Game();
    console.log(this.game)
  }

  endGame(){
    console.log('das spiel ist zu ende')
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){  //prüfen ob es name überhaupt gibt, danach wird geprüft ob der Name länger als 0 ist
      this.game.players.push(name);}
    });
  }
}
