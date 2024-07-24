import { TextLogoIcon } from '@assets';
import { Link } from 'react-router-dom';

function SignInPage() {
  return (
    <div className="mt-10 flex flex-col items-center tablet:mt-20 desktop:mt-40">
      <div className="flex w-[340px] flex-col items-center tablet:w-[640px]">
        <TextLogoIcon width={270} height={90} />
        <div className="mt-4 self-start text-xl text-black">아이디</div>
        <div className="mt-4 h-10 w-full rounded-md bg-slate-200">.</div>
        <div className="mt-4 self-start text-xl text-black">비밀번호</div>
        <div className="mt-4 h-10 w-full rounded-md bg-slate-200">.</div>
        <button
          type="button"
          className="mt-12 h-10 w-full rounded-md bg-slate-400"
        >
          로그인하기
        </button>
        <div className="mt-8 flex flex-row">
          <span>슬리드 투 두가 처음이신가요?</span>
          <Link to="/signup" className="ml-2 text-blue-600 underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
