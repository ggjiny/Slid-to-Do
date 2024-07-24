import { TextLogoIcon } from '@assets';
import { Link } from 'react-router-dom';

function SignUpPage() {
  return (
    <div className="mt-10 flex flex-col items-center tablet:mt-20 desktop:mt-40">
      <div className="flex w-[340px] flex-col items-center tablet:w-[640px]">
        <TextLogoIcon width={270} height={90} />
        <div className="mt-4 self-start text-xl text-black">이름</div>
        <div className="mt-4 h-10 w-full rounded-md bg-slate-200">.</div>
        <div className="mt-4 self-start text-xl text-black">이메일</div>
        <div className="mt-4 h-10 w-full rounded-md bg-slate-200">.</div>
        <div className="mt-4 self-start text-xl text-black">비밀번호</div>
        <div className="mt-4 h-10 w-full rounded-md bg-slate-200">.</div>
        <div className="mt-4 self-start text-xl text-black">비밀번호 확인</div>
        <div className="mt-4 h-10 w-full rounded-md bg-slate-200">.</div>
        <button
          type="button"
          className="mt-12 h-10 w-full rounded-md bg-slate-400"
        >
          회원가입하기
        </button>
        <div className="mt-8 flex flex-row">
          <span>이미 회원이신가요?</span>
          <Link to="/signin" className="ml-2 text-blue-600 underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
