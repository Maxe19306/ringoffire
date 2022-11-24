import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameID: string;
    game: Game;
  Endgame = false;
  

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore, 
    public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
  this.newGame();
    this.route.params.subscribe((params) => {
    this.gameID = params["id"],
    
    this
    .firestore
    .collection('games')
    .doc(this.gameID)
    .valueChanges()
    .subscribe((game: any) => {
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCard = game.playedCard;
      this.game.players = game.players;
      this.game.stack = game.stack;
      this.game.currentCard = game.currentCard;
      this.game.pickCardAnimation= game.pickCardAnimation;
      this.game.playable = game.playable;
      this.game.playerImages = game.playerImages;
    })
    
    }  );


  }
  editPlayer(PlayerID:number){
    console.log('edit player',PlayerID)
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe(change => {
      if(change){
        if(change == 'DELETE'){
          this.game.playerImages.splice(PlayerID,1)
          this.game.players.splice(PlayerID,1)
        } else{
      console.log('edit player',change)
      this.game.playerImages[PlayerID] = change;
     }} 
     this.saveGame();});
  }
  
  pickCard(){
    if (this.game.stack.length == 0){
     this.Endgame = true;}

    else{
      if(!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();  // this.game.stack.pop() nimmt die letzte Karte vom Array Stack und löscht sie gleichzeitig.
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame(); 
      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard)
        this.game.pickCardAnimation = false;   
        this.saveGame();   // setzen Animation zurück, damit die Animation bei jeder Karte zurück gesetzt wird.
      }, 1200);
    }

    
    } 
  }

  newGame(){
    this.game = new Game();
  
  }

  endGame(){
    console.log('das spiel ist zu ende')
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){  //prüfen ob es name überhaupt gibt, danach wird geprüft ob der Name länger als 0 ist
      this.game.players.push(name);
      this.game.playable = true;
      this.game.playerImages.push('profilimage.png');

        this.saveGame();
    }
    console.log(this.game)
    });
  }


  saveGame(){
    this
    .firestore
    .collection('games')
    .doc(this.gameID)
    .update(this.game.toJson())
  }

  
  restartGame(){
    this.game.currentCard = '';
    this.game.playedCard.splice(0, this.game.playedCard.length)
    this.Endgame = false;
  }

  
}

