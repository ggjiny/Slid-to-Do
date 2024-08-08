interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function FilterButton({ label, isSelected, onClick }: FilterButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-2.5 rounded-[17px] border ${
        isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-200 bg-white'
      } px-3 py-1`}
      onClick={onClick}
      type="button"
    >
      <div
        className={`whitespace-nowrap text-sm font-medium leading-tight ${
          isSelected ? 'text-white' : 'text-slate-800'
        }`}
      >
        {label}
      </div>
    </button>
  );
}

export default FilterButton;
