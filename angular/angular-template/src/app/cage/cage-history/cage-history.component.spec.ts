import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageHistoryComponent } from './cage-history.component';

describe('CageHistoryComponent', () => {
  let component: CageHistoryComponent;
  let fixture: ComponentFixture<CageHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
