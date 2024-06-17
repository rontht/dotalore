import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpandedHeroPage } from './expanded-hero.page';

describe('ExpandedHeroPage', () => {
  let component: ExpandedHeroPage;
  let fixture: ComponentFixture<ExpandedHeroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedHeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
