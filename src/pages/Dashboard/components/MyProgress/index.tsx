import { ProgressEllipseIcon, ProgressIcon } from '@assets';
import { PieChart } from '@mui/x-charts/PieChart';

function MyProgress() {
  const progress = 30;

  const options = {
    data: [
      { value: progress, color: '#0F172A' },
      { value: 100 - progress, color: '#F8FAFC' },
    ],
    innerRadius: 55,
    animationDuration: '2000ms',
  };

  return (
    <div className="relative flex h-[250px] justify-between overflow-hidden rounded-xl bg-blue-500 py-4 pl-4 pr-6 text-white tablet:px-6">
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <ProgressIcon />
          <div className="mt-4 text-lg font-semibold leading-7">
            내 진행 상황
          </div>
          <div className="mt-1 flex items-center gap-1">
            <div className="text-3xl font-bold leading-9">{progress}</div>
            <div className="font-semibold leading-6">%</div>
          </div>
        </div>
        <div className="z-10 mt-[26px] desktop:mr-[68px]">
          <PieChart
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            series={[options]}
            width={166}
            height={166}
            sx={{
              strokeOpacity: 0,
            }}
            slotProps={{
              popper: {
                sx: {
                  display: 'none',
                },
              },
            }}
          />
        </div>
      </div>
      <ProgressEllipseIcon className="absolute bottom-0 right-0 z-0" />
    </div>
  );
}

export default MyProgress;
