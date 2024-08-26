import FlagBoxIcon from '@components/FlagBoxIcon';

interface InfoSectionProps {
  title: string;
  goalTitle: string | undefined;
  done: boolean;
}

function InfoSection({ title, goalTitle, done }: InfoSectionProps) {
  return (
    <>
      <div className="mb-3 flex gap-[6px]">
        <FlagBoxIcon isSmall />
        <h3 className="font-medium leading-6 text-slate-800">
          {goalTitle || '목표 없음'}
        </h3>
      </div>
      <div className="flex items-center gap-2 border-b border-b-slate-200 pb-6">
        <div className="flex rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
          <span className="text-xs font-medium leading-4 text-slate-700">
            {done ? 'Done' : 'To do'}
          </span>
        </div>
        <p className="text-sm leading-5 text-slate-700">{title}</p>
      </div>
    </>
  );
}

export default InfoSection;
