import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BackofficeCoursesResponse } from '../../../../Contexts/Backoffice/Courses/application/BackofficeCoursesResponse';
import { SearchCoursesByCriteriaQuery } from '../../../../Contexts/Backoffice/Courses/application/SearchByCriteria/SearchCoursesByCriteriaQuery';
import { BackofficeCourse } from '../../../../Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';

type FilterType = { value: string; operator: string; field: string };
export class CoursesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response) {
    const { query: queryParams } = _req;
    const { filters, orderBy, order, limit, offset } = queryParams;

    const query = new SearchCoursesByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );

    const queryResponse: BackofficeCoursesResponse = await this.queryBus.ask(query);

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send(this.toResponse(queryResponse.courses));
  }

  private parseFilters(params: Array<FilterType>): Array<Map<string, string>> {
    if (!params) {
      return new Array<Map<string, string>>();
    }

    return params.map(filter => {
      const field = filter.field;
      const value = filter.value;
      const operator = filter.operator;

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value]
      ]);
    });
  }

  private toResponse(courses: Array<BackofficeCourse>) {
    return courses.map(course => ({
      id: course.id.toString(),
      duration: course.duration.toString(),
      name: course.name.toString()
    }));
  }
}
