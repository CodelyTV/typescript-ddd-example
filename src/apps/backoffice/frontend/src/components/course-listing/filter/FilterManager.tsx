import React, { useState } from 'react';
import { Course, searchCourses } from '../../../services/courses';
import AddFilterButton from './AddFilterButton';
import Filter from './Filter';
import FilterButton from './FilterButton';

export interface FilterState {
  field: string;
  operator: string;
  value: string;
}

function FilterManager({ onFilter }: { onFilter: (courses: Course[]) => void }) {
  const [filters, setFilters] = useState<FilterState[]>([]);

  return (
    <form
      id="courses-filters"
      name="filter-courses"
      className="text-left"
      action="#"
      onSubmit={e => e.preventDefault()}
    >
      {filters.map((filter, index) => (
        <Filter
          key={index}
          onFieldSelected={event => {
            filters[index] = {
              ...filters[index],
              field: event.target.options[event.target.options.selectedIndex].value
            };
            setFilters(filters);
          }}
          onOperatorSelected={event => {
            filters[index] = {
              ...filters[index],
              operator: event.target.options[event.target.options.selectedIndex].value
            };
            setFilters(filters);
          }}
          onValueChanged={event => {
            filters[index] = { ...filters[index], value: event.target.value };
            setFilters(filters);
          }}
        />
      ))}

      <AddFilterButton onAdd={() => setFilters([...filters, { field: 'id', operator: '=', value: '' }])} />
      <FilterButton
        onFilter={async () => {
          const courses = await searchCourses({ filters });
          onFilter(courses);
        }}
      />
    </form>
  );
}

export default FilterManager;
