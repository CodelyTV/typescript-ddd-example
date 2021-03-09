import { Criteria } from '../../../../../src/Contexts/Shared/domain/criteria/Criteria';
import { Filter } from '../../../../../src/Contexts/Shared/domain/criteria/Filter';
import { FilterField } from '../../../../../src/Contexts/Shared/domain/criteria/FilterField';
import { FilterOperator, Operator } from '../../../../../src/Contexts/Shared/domain/criteria/FilterOperator';
import { Filters } from '../../../../../src/Contexts/Shared/domain/criteria/Filters';
import { FilterValue } from '../../../../../src/Contexts/Shared/domain/criteria/FilterValue';
import { Order } from '../../../../../src/Contexts/Shared/domain/criteria/Order';

export class BackofficeCourseCriteriaMother {
  static whithoutFilter(): Criteria {
    return new Criteria(new Filters([]), Order.fromValues());
  }

  static nameAndDurationContainsSortAscById(name: string, duration: string): Criteria {
    const filterFieldName = new FilterField('name');
    const filterFieldDuration = new FilterField('duration');
    const filterOperator = new FilterOperator(Operator.CONTAINS);
    const valueName = new FilterValue(name);
    const valueDuration = new FilterValue(duration);

    const nameFilter = new Filter(filterFieldName, filterOperator, valueName);
    const durationFilter = new Filter(filterFieldDuration, filterOperator, valueDuration);

    return new Criteria(new Filters([nameFilter, durationFilter]), Order.asc('id'));
  }
}
