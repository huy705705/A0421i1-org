import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesIllnessEditComponent } from './entities-illness-edit.component';

describe('EntitiesIllnessEditComponent', () => {
  let component: EntitiesIllnessEditComponent;
  let fixture: ComponentFixture<EntitiesIllnessEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesIllnessEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesIllnessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
