import { FR } from 'country-flag-icons/react/3x2';
import { ES } from 'country-flag-icons/react/3x2';
import { PT } from 'country-flag-icons/react/3x2';
import { GB } from 'country-flag-icons/react/3x2';
import { cn } from '@/lib/utils.ts';

export interface Language {
  code: string;
  label: string;
  FlagComponent: React.ComponentType<{ className?: string }>;
}

export const AVAILABLE_LANGUAGES: Language[] = [
  { code: 'fr-FR', label: 'Français', FlagComponent: FR },
  { code: 'es-ES', label: 'Espagnol', FlagComponent: ES },
  { code: 'pt-PT', label: 'Portugais', FlagComponent: PT },
  // Catalan: on réutilise le drapeau ES par défaut
  { code: 'ca-ES', label: 'Catalan', FlagComponent: ({ className }) => (
      <span className={cn('fi fi-es-ct', className)}  />
    ) },
  { code: 'en-US', label: 'Anglais', FlagComponent: GB },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return AVAILABLE_LANGUAGES.find((lang) => lang.code === code);
};
