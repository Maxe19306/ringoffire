import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'Touch the tabletop with your thumb. The player who touches the table last has to take a sip.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'The person who draws a jack is allowed to come up with a new rule that applies until the end of the game. The rule may not override others.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title: string = '';
  description: string = '';

  @Input() card:string;


  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void{
    if(this.card){
    let cardNumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardNumber-1].title;
    this.description = this.cardAction[cardNumber-1].description;}
  }
}