import { describe, it, expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { DialogRef } from '@angular/cdk/dialog';
import { CartDrawerComponent } from './cart-drawer.component';
import { CartStore } from '@app/features/products/store/cart.store';

const mockDialogRef = { close: vi.fn() };

describe('CartDrawerComponent', () => {
  beforeEach(() => {
    mockDialogRef.close.mockClear();
    TestBed.configureTestingModule({
      imports: [CartDrawerComponent],
      providers: [CartStore, { provide: DialogRef, useValue: mockDialogRef }],
    });
  });

  it('close() delegates to dialogRef.close()', () => {
    const component = TestBed.createComponent(CartDrawerComponent).componentInstance;
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalledOnce();
  });
});
