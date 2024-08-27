import { TextLogoIcon } from '@assets';
import Button from '@components/Button';
import BaseInput from '@components/Input/BaseInput';
import PasswordInput from '@components/Input/PasswordInput';
import { VALID_MAIL_REGEX } from '@constants/regex';
import useLogin from '@hooks/api/authAPI/useLogin';
import { AxiosResponse, isAxiosError } from 'axios';
import { KeyboardEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}
function SignInPage() {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const onSuccess = (res: AxiosResponse) => {
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    navigate('/dashboard');
  };
  const onError = (err: Error) => {
    if (isAxiosError(err) && err.response) {
      if (err.response.status === 404) {
        setError('email', {
          type: 'manual',
          message: '가입되지 않은 이메일입니다.',
        });
      }
      if (
        err.response.status === 400 &&
        err.response.data.message === '비밀번호가 올바르지 않습니다.'
      ) {
        setError('password', {
          type: 'manual',
          message: '비밀번호가 올바르지 않습니다.',
        });
      }
    }
  };
  const { mutate } = useLogin(onSuccess, onError);

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  const preventSpace = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const password = useWatch({ control, name: 'password' });
  const id = useWatch({ control, name: 'email' });

  return (
    <div className="flex flex-col items-center pt-[48px] tablet:pt-[64px] desktop:pt-[120px]">
      <div className="flex w-[343px] flex-col items-center tablet:w-[640px]">
        <TextLogoIcon width={270} height={89} />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-full">
          <div>
            <label
              htmlFor="email"
              className="self-start text-base font-semibold"
            >
              이메일
            </label>
            <BaseInput
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: VALID_MAIL_REGEX,
                  message: '유효한 이메일 주소를 입력해주세요.',
                },
              })}
              id="email"
              size="lg"
              isInvalid={!!errors.email}
              placeholder="이메일을 입력해주세요."
              additionalClass="mt-3"
              onKeyDown={preventSpace}
            />
            {errors.email && (
              <p className="ml-4 mt-2 text-sm font-normal text-red-700">
                {errors.email.message}
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
          <Button
            shape="solid"
            size="lg"
            additionalClass="w-full mt-[48px]"
            type="submit"
            disabled={id === '' || password === ''}
          >
            로그인하기
          </Button>
        </form>
        <div className="mt-[40px] flex flex-row">
          <span>슬리드 투 두가 처음이신가요?</span>
          <Link to="/sign-up" className="ml-2 text-blue-600 underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
