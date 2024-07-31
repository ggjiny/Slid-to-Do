import { TextLogoIcon } from '@assets';
import Button from '@components/Button';
import BaseInput from '@components/Input/BaseInput';
import PasswordInput from '@components/Input/PasswordInput';
import { VALID_MAIL_REGEX } from '@constants/regex';
import { KeyboardEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface FormValues {
  name: string;
  id: string;
  password: string;
  passwordConfirm: string;
}
function SignInPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      id: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => data;

  const preventSpace = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const password = useWatch({ control, name: 'password' });

  return (
    <div className="flex flex-col items-center pt-[48px] tablet:pt-[64px] desktop:pt-[120px]">
      <div className="flex w-[343px] flex-col items-center tablet:w-[640px]">
        <TextLogoIcon width={270} height={89} />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-full">
          <div>
            <label
              htmlFor="name"
              className="self-start text-base font-semibold"
            >
              이름
            </label>
            <BaseInput
              {...register('name', {
                required: '이름을 입력해주세요.',
                minLength: {
                  value: 3,
                  message: '이름이 3글자 이상이 되도록 해 주세요.',
                },
              })}
              id="name"
              size="lg"
              isInvalid={!!errors.name}
              placeholder="이름을 입력해주세요."
              additionalClass="mt-3"
              onKeyDown={preventSpace}
            />
            {errors.name && (
              <p className="ml-4 mt-2 text-sm font-normal text-red-700">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="id" className="self-start text-base font-semibold">
              이메일
            </label>
            <BaseInput
              {...register('id', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: VALID_MAIL_REGEX,
                  message: '유효한 이메일 주소를 입력해주세요.',
                },
              })}
              id="id"
              size="lg"
              isInvalid={!!errors.id}
              placeholder="이메일을 입력해주세요."
              additionalClass="mt-3"
              onKeyDown={preventSpace}
            />
            {errors.id && (
              <p className="ml-4 mt-2 text-sm font-normal text-red-700">
                {errors.id.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="self-start text-base font-semibold"
            >
              비밀번호
            </label>
            <PasswordInput
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호가 8자 이상이 되도록 해 주세요.',
                },
              })}
              id="password"
              size="lg"
              isInvalid={!!errors.password}
              placeholder="비밀번호를 입력해주세요."
              additionalClass="w-full mt-3"
              onKeyDown={preventSpace}
            />
            {errors.password && (
              <p className="ml-4 mt-2 text-sm font-normal text-red-700">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label
              htmlFor="passwordConfirm"
              className="self-start text-base font-semibold"
            >
              비밀번호 확인
            </label>
            <PasswordInput
              {...register('passwordConfirm', {
                required: '비밀번호를 다시 한번 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호가 8자 이상이 되도록 해 주세요.',
                },
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다.',
              })}
              id="passwordConfirm"
              size="lg"
              isInvalid={!!errors.passwordConfirm}
              placeholder="비밀번호를 다시 한번 입력해주세요."
              additionalClass="w-full mt-3"
              onKeyDown={preventSpace}
            />
            {errors.passwordConfirm && (
              <p className="ml-4 mt-2 text-sm font-normal text-red-700">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
          <Button
            shape="solid"
            size="lg"
            additionalClass="w-full mt-[48px]"
            type="submit"
            disabled={!isValid}
          >
            회원가입하기
          </Button>
        </form>
        <div className="mt-[40px] flex flex-row">
          <span>이미 회원이신가요?</span>
          <Link to="/sign-in" className="ml-2 text-blue-600 underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
