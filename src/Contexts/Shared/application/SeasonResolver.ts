import { Clock } from '../domain/Clock';
import { Hemisphere } from '../domain/Hemisphere';
import { Season } from '../domain/Season';
import { Seasons } from '../domain/Seasons';
import { InvalidArgumentError } from '../domain/value-object/InvalidArgumentError';

export class SeasonResolver {
  constructor(private readonly clock: Clock, private readonly hemisphere: Hemisphere) {}

  resolve(): Season {
    const currentDate = this.clock.now();
    const currentHemisphereLocation = this.hemisphere.fromLocation();
    const seasons = Seasons.of(currentHemisphereLocation);
    const resolvedSeason = seasons.find(season => season.isDateWithin(currentDate));

    if (resolvedSeason === undefined) {
      throw new InvalidArgumentError('Season could not be resolved.');
    }

    return resolvedSeason;
  }
}
