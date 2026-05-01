import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCreatorComponent } from './skill-creator.component';

describe('SkillCreatorComponent', () => {
  let component: SkillCreatorComponent;
  let fixture: ComponentFixture<SkillCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillCreatorComponent]
    });
    fixture = TestBed.createComponent(SkillCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
