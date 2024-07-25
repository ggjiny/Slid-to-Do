import { useForm } from 'react-hook-form';
import BaseInput from '.';
import PasswordInput from '../PasswordInput';

interface FormValues {
  id: string;
  password: string;
}

function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => data;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="id" className="text-base font-semibold">
        아이디
      </label>
      <BaseInput
        {...register('id', {
          // required: true,
          required: 'This field is required',
          minLength: { value: 3, message: 'Minimum length is 3' },
        })}
        id="id"
        size="lg"
        isInvalid={!!errors.id}
        placeholder="placeholder"
        additionalClass="mt-3"
      />
      {errors.id && (
        <p className="ml-4 mt-2 text-sm font-normal text-red-700">
          {errors.id.message}
        </p>
      )}
      <label htmlFor="password" className="text-base font-semibold">
        비밀번호
      </label>
      <PasswordInput
        {...register('password', {
          // required: true,
          required: 'This field is required',
          minLength: { value: 3, message: 'Minimum length is 3' },
        })}
        id="password"
        size="lg"
        isInvalid={!!errors.password}
        placeholder="placeholder"
        additionalClass="mt-3"
      />
      {errors.password && (
        <p className="ml-4 mt-2 text-sm font-normal text-red-700">
          {errors.password.message}
        </p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ExampleForm;
