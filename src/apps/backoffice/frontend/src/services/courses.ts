export type Course = {
  id: string;
  name: string;
  duration: string;
};

type Query = {
  filters: Array<{ field: string; operator: string; value: string }>;
};

const post = async (url: string, body: Record<string, unknown>) => {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...body }),
    headers: { 'Content-Type': 'application/json' }
  });
};

const get = async (url: string) => {
  return await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
};

export const createCourse = (course: Course) => post('http://localhost:3000/courses', course);

export const getAllCourses = async () => {
  const response = await get('http://localhost:3000/courses');
  return (await response.json()) as Course[];
};

export const searchCourses = async (query: Query) => {
  const filters = query.filters.map(
    (filter, index) =>
      `filters[${index}][field]=${filter.field}&filters[${index}][operator]=${filter.operator}&filters[${index}][value]=${filter.value}`
  );

  const params = filters.join('&');

  const response = await get(`http://localhost:3000/courses?${params}`);
  return (await response.json()) as Course[];
};
