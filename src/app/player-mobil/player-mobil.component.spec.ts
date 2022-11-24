import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMobilComponent } from './player-mobil.component';

describe('PlayerMobilComponent', () => {
  let component: PlayerMobilComponent;
  let fixture: ComponentFixture<PlayerMobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerMobilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
