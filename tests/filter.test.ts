import { describe, it, expect } from 'vitest';
import { propertyAdapter } from '../services/adapters/propertyAdapter';

describe('Property Adapter Filtering', () => {
  it('filters properties by purpose for sale', async () => {
    const res = await propertyAdapter.getProperties({ purpose: 'sale' });
    expect(res.properties.every(p => p.purpose === 'sale')).toBe(true);
  });

  it('filters properties by purpose for rent', async () => {
    const res = await propertyAdapter.getProperties({ purpose: 'rent' });
    expect(res.properties.every(p => p.purpose === 'rent')).toBe(true);
  });
});
