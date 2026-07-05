import { useMemo, useState } from 'react';
import AlphabetFilter from './AlphabetFilter';
import BrowseFilters from './BrowseFilters';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import VillageGrid from './VillageGrid';
import { ALL_LETTERS, ALL_MANDALS, getBrowseVillages, getMandalOptions } from './browseAreaData';
import {
  filterBrowseVillages,
  formatResultCount,
  getAvailableLetters,
  hasActiveBrowseFilters,
  paginateVillages,
} from './browseAreaUtils';

export default function BrowseByAreaSection() {
  const villages = useMemo(() => getBrowseVillages(), []);
  const mandalOptions = useMemo(() => getMandalOptions(villages), [villages]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMandal, setSelectedMandal] = useState(ALL_MANDALS);
  const [activeLetter, setActiveLetter] = useState(ALL_LETTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const filterState = { search: searchQuery, mandal: selectedMandal, letter: activeLetter };

  const filteredVillages = useMemo(
    () => filterBrowseVillages(villages, filterState),
    [villages, searchQuery, selectedMandal, activeLetter],
  );

  const availableLetters = useMemo(
    () => getAvailableLetters(villages, { search: searchQuery, mandal: selectedMandal }),
    [villages, searchQuery, selectedMandal],
  );

  const { items: pagedVillages, totalPages, page } = useMemo(
    () => paginateVillages(filteredVillages, currentPage),
    [filteredVillages, currentPage],
  );

  const filtersActive = hasActiveBrowseFilters(filterState);

  const resultCountLabel = formatResultCount({
    pageCount: pagedVillages.length,
    filteredCount: filteredVillages.length,
    totalCount: villages.length,
    filtersActive,
  });

  function handleSearchChange(value) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleMandalChange(mandal) {
    setSelectedMandal(mandal);
    setCurrentPage(1);
  }

  function handleLetterChange(letter) {
    setActiveLetter(letter);
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setSearchQuery('');
    setSelectedMandal(ALL_MANDALS);
    setActiveLetter(ALL_LETTERS);
    setCurrentPage(1);
  }

  return (
    <section>
      <div className="mb-5 sm:mb-6">
        <h2 className="text-xl font-bold text-primary sm:text-2xl">Browse Land by Area</h2>
        <p className="mt-1 text-sm text-gray-500">Find land listings by Village or Mandal.</p>
      </div>

      <div className="mb-4">
        <BrowseFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedMandal={selectedMandal}
          mandalOptions={mandalOptions}
          onMandalChange={handleMandalChange}
          onClear={handleClearFilters}
        />
      </div>

      <div className="mb-5">
        <AlphabetFilter
          activeLetter={activeLetter}
          availableLetters={availableLetters}
          onChange={handleLetterChange}
        />
      </div>

      <p className="mb-4 text-sm text-gray-500">{resultCountLabel}</p>

      {filteredVillages.length === 0 ? (
        <EmptyState onClear={handleClearFilters} />
      ) : (
        <VillageGrid villages={pagedVillages} />
      )}

      {filteredVillages.length > 0 ? (
        <div className="mt-6">
          <Pagination page={page} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      ) : null}
    </section>
  );
}
