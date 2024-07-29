import FilterButton from './FilterButton';

interface FilterButtonsProps {
  selectedFilter: 'All' | 'Todo' | 'Done';
  onFilterChange: (filter: 'All' | 'Todo' | 'Done') => void;
}

function FilterButtons({ selectedFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="inline-flex items-start justify-start gap-2">
      <FilterButton
        label="All"
        isSelected={selectedFilter === 'All'}
        onClick={() => onFilterChange('All')}
      />
      <FilterButton
        label="To do"
        isSelected={selectedFilter === 'Todo'}
        onClick={() => onFilterChange('Todo')}
      />
      <FilterButton
        label="Done"
        isSelected={selectedFilter === 'Done'}
        onClick={() => onFilterChange('Done')}
      />
    </div>
  );
}

export default FilterButtons;
