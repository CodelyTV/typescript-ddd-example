import { Criteria } from '@/Contexts/Shared/domain/criteria/Criteria';
import { Filter } from '@/Contexts/Shared/domain/criteria/Filter';
import { FilterField } from '@/Contexts/Shared/domain/criteria/FilterField';
import { FilterOperator, Operator } from '@/Contexts/Shared/domain/criteria/FilterOperator';
import { Filters } from '@/Contexts/Shared/domain/criteria/Filters';
import { FilterValue } from '@/Contexts/Shared/domain/criteria/FilterValue';
import { Order } from '@/Contexts/Shared/domain/criteria/Order';

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
