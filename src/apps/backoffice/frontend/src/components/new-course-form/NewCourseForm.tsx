import React, { useState } from 'react';
import Form from '../form/Form';
import FormInput from '../form/FormInput';
import { v4, validate as isValidUUID } from 'uuid';
import { createCourse } from '../../services/courses';

interface State {
  id?: string;
  name?: string;
  duration?: string;
}

type Errors = Partial<Record<keyof State, string>>;

type NewCourse = Required<State>;

const isLength = ({ value, min, max }: { value: string, min: number, max: number }) =>
  value.length >= min && value.length <= max;

function NewCourseForm({ onSuccess, onError }: { onSuccess?: (event: NewCourse) => void; onError?: Function }) {
  const [state, setState] = useState<State>({ id: v4() });
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const id = state.id && isValidUUID(state.id) ? '' : 'Identificador de curso inválido';
    const name = state.name && isLength({ value: state.name, min: 1, max: 30 }) ? '' : 'Nombre de curso inválido';
    const duration = state.duration && isLength({ value: state.duration, min: 4, max: 100 }) ? '' : 'Duración de curso inválida';

    setErrors({ id, name, duration });

    const hasNoErrors = Boolean(!id && !name && !duration);

    return hasNoErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      try {
        await createCourse(state as NewCourse);

        setState({ id: v4(), name: '', duration: '' });
        setErrors({ });
        onSuccess && onSuccess(state as NewCourse);
      } catch (error) {
        onError && onError();
      }
    }
  };

  return (
    <Form
      className="w-full text-left"
      id="create-course"
      title="Crear curso"
      submitLabel="Crear curso!"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
          <FormInput
            id="grid-uuid"
            label="Identificador"
            name="id"
            placeholder="En formato UUID"
            value={state.id}
            onChange={event => setState({ ...state, id: event.target.value })}
            error={errors.id}
            disabled={true}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            id="grid-first-name"
            label="Nombre"
            name="name"
            placeholder="DDD en TS"
            value={state.name}
            onChange={event => setState({ ...state, name: event.target.value })}
            error={errors.name}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <FormInput
            id="grid-duration"
            label="Duración (en inglés)"
            name="duration"
            placeholder="8 days"
            value={state.duration}
            onChange={event => setState({ ...state, duration: event.target.value })}
            error={errors.duration}
          />
        </div>
      </div>
    </Form>
  );
}

export default NewCourseForm;
