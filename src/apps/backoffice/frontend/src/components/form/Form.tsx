import React, { FormEventHandler } from 'react';
import type FormInput from './FormInput';
import FormSubmit from './FormSubmit';
import FormTitle from './FormTitle';

function Form({
  id,
  title,
  submitLabel,
  onSubmit,
  children,
  className
}: {
  id: string;
  title: string;
  submitLabel: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: React.ReactElement<typeof FormInput> | React.ReactElement<typeof FormInput>[];
  className: string;
}) {
  return (
    <form className={className} onSubmit={onSubmit} id={id}>
      <FormTitle title={title} />
      {[children].flat().map((child, index) => (
        <div key={`input-${index}`}>{child}</div>
      ))}
      <FormSubmit label={submitLabel} />
    </form>
  );
}

export default Form;
