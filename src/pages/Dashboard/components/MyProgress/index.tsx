import { ProgressEllipseIcon, ProgressIcon } from '@assets';

function MyProgress() {
  return (
    <div className="relative h-[250px] overflow-hidden rounded-xl bg-blue-500 px-6 py-4 text-white">
      <div className="flex flex-col">
        <ProgressIcon />
        <div className="mt-4 text-lg font-semibold leading-7">내 진행 상황</div>
        <div className="mt-1 flex items-center gap-1">
          <div className="text-3xl font-bold leading-9">0</div>
          <div className="font-semibold leading-6">%</div>
        </div>
      </div>
      <ProgressEllipseIcon className="absolute bottom-0 right-0" />
    </div>
  );
}

export default MyProgress;
