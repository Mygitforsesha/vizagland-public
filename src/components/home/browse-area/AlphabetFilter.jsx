import { useEffect, useRef } from 'react';
import { ALL_LETTERS } from './browseAreaData';
import { ALPHABET_LETTERS } from './browseAreaUtils';

const LETTER_OPTIONS = [ALL_LETTERS, ...ALPHABET_LETTERS];

export default function AlphabetFilter({ activeLetter, availableLetters, onChange }) {
  const activeButtonRef = useRef(null);

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [activeLetter]);

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {LETTER_OPTIONS.map((letter) => {
        const isAll = letter === ALL_LETTERS;
        const isActive = activeLetter === letter;
        const isDisabled = !isAll && !availableLetters.has(letter);

        return (
          <button
            key={letter}
            ref={isActive ? activeButtonRef : null}
            type="button"
            disabled={isDisabled}
            onClick={() => onChange(letter)}
            className={`min-h-9 min-w-[2rem] shrink-0 rounded border px-2 py-1.5 text-xs font-semibold ${
              isActive
                ? 'border-primary bg-primary text-white'
                : isDisabled
                  ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary'
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
