import { Course } from '../../services/courses';
import Table from '../table/Table';
import TableBody from '../table/TableBody';
import TableCell from '../table/TableCell';
import TableHead from '../table/TableHead';
import TableHeader from '../table/TableHeader';
import TableRow from '../table/TableRow';
import FilterManager from './filter/FilterManager';
import ListingTitle from './ListingTitle';

function CourseListing({ courses, onFilter }: { courses: Course[]; onFilter: (courses: Course[]) => void }) {
  return (
    <div>
      <ListingTitle title="Cursos existentes" />
      <FilterManager onFilter={onFilter} />
      <Table className="text-left w-full border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead name="Id" />
            <TableHead name="Nombre" />
            <TableHead name="Duración" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={`row-${index}`}>
              <TableCell value={course.id} />
              <TableCell value={course.name} />
              <TableCell value={course.duration} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CourseListing;
