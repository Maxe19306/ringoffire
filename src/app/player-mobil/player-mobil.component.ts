import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobil',
  templateUrl: './player-mobil.component.html',
  styleUrls: ['./player-mobil.component.scss']
})
export class PlayerMobilComponent implements OnInit {
  @Input() name;
  @Input() playerActive: boolean = false;
  @Input() image = 'profilimage.png';
  constructor() { }

  ngOnInit(): void {
  }

}
