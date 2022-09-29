import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import CourseListing from '../components/course-listing/CourseListing';
import NewCourseForm from '../components/new-course-form/NewCourseForm';
import PageContainer from '../components/page-container/PageContainer';
import PageSeparator from '../components/page-container/PageSeparator';
import { Course, getAllCourses } from '../services/courses';

function Courses() {
  const [alert, setAlert] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);

  const handleSuccess = (course: Course) => {
    setCourses([...courses, { ...course }]);
    setAlert(`Felicidades, el curso ${course.id} ha sido creado correctamente!`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getAllCourses();
      setCourses(courses);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 p-5">
      <Helmet>
        <title>CodelyTV | Cursos</title>
      </Helmet>

      <PageContainer title="Cursos" alert={alert}>
        <NewCourseForm
          onSuccess={handleSuccess}
          onError={() => setAlert('Lo siento, ha ocurrido un error al crear el curso')}
        />

        <PageSeparator />

        <CourseListing courses={courses} onFilter={courses => setCourses(courses)} />
      </PageContainer>
    </div>
  );
}

export default Courses;
