import { ProfileIcon, TextLogoIcon } from '@assets';
import routes from '@constants/routes';
import useWindowWidth from '@hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  userData: { name: string; email: string };
  toggleSideBar: () => void;
}

function LogoutBtn() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate(`${routes.signIn}`);
      }}
    >
      <span className="text-xs font-normal leading-4 text-slate-400">
        로그아웃
      </span>
    </button>
  );
}

function Header({ userData, toggleSideBar }: HeaderProps) {
  const navigate = useNavigate();
  const width = useWindowWidth();

  return (
    <>
      <TextLogoIcon
        className="cursor-pointer"
        onClick={() => {
          navigate(`${routes.dashboard}`);
          if (width < 1920) toggleSideBar();
        }}
      />
      <div className="mt-4 flex flex-row max-tablet:mb-6 max-tablet:justify-between">
        <div className="flex flex-row">
          <ProfileIcon
            width={width < 744 ? 32 : 64}
            height={width < 744 ? 32 : 64}
          />
          <div className="ml-3 flex flex-col items-start justify-between">
            <div
              id="name"
              className="h-4 text-xs font-semibold leading-5 text-slate-800 tablet:text-sm"
            >
              {userData.name}
            </div>
            <div
              id="email"
              className="h-4 text-xs font-medium leading-5 text-slate-600 tablet:text-sm"
            >
              {userData.email}
            </div>
            {width >= 744 && <LogoutBtn />}
          </div>
        </div>
        {width < 744 && (
          <div className="max-tablet:flex max-tablet:items-end">
            <LogoutBtn />
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
