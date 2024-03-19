import { makeSlug } from './make-slug';

describe('makeSlug', () => {
  it('should return a slug', () => {
    expect(makeSlug('Hello World')).toBe('hello-world');
  });

  it('Should work with accents', () => {
    expect(makeSlug('Maçã Hidropônica do Himalaia')).toBe(
      'maca-hidroponica-do-himalaia',
    );
  });

  it('Should handle numbers correctly', () => {
    expect(makeSlug('TV de Íons 127 polegadas')).toBe(
      'tv-de-ions-127-polegadas',
    );
  });
});
