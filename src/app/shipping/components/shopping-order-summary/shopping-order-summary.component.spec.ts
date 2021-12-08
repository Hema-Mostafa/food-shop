import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderSummaryComponent } from './shopping-order-summary.component';

describe('ShoppingOrderSummaryComponent', () => {
  let component: ShoppingOrderSummaryComponent;
  let fixture: ComponentFixture<ShoppingOrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
