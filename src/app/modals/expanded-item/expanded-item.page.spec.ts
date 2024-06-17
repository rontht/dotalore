import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpandedItemPage } from './expanded-item.page';

describe('ExpandedItemPage', () => {
  let component: ExpandedItemPage;
  let fixture: ComponentFixture<ExpandedItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
