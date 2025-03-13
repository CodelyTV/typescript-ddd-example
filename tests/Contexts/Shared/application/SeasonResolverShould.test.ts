import { Clock } from '../../../../src/Contexts/Shared/domain/Clock';
import { Hemisphere } from '../../../../src/Contexts/Shared/domain/Hemisphere';
import { SeasonResolver } from '../../../../src/Contexts/Shared/application/SeasonResolver';

describe('SeasonResolver', () => {
  it('should resolve the season by a given date and a hemisphere', () => {
    const clock: Clock = {
      now: jest.fn(() => new Date(2025, 2, 10))
    };

    const hemisphere: Hemisphere = {
      fromLocation: jest.fn(() => 'north')
    };

    const expectedSeasonName = 'winter';
    const resolver = new SeasonResolver(clock, hemisphere);
    const resolvedSeason = resolver.resolve();

    expect(resolvedSeason.name).toBe(expectedSeasonName);
  });

  it('should throw an error if the season cannot be resolved', () => {
    // Empty implementation of Clock interface
    const clock: Clock = {
      now: jest.fn()
    };

    // Empty implementation of Hemisphere interface
    const hemisphere: Hemisphere = {
      fromLocation: jest.fn()
    };

    const resolver = new SeasonResolver(clock, hemisphere);

    expect(resolver.resolve).toThrow(TypeError);
  });
});
