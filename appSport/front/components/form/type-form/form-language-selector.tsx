import { useEffect, useState } from 'react';
import { Button } from '@/core/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/components/ui/popover';
import { Plus, X } from 'lucide-react';
import {
  ACTIVE_LANGUAGE_FIELD,
  cn,
  TRANSLATION_ORIGINAL_KEY,
} from '@/lib/utils';
import {
  AVAILABLE_LANGUAGES,
  getLanguageByCode,
} from '@/core/components/form/form-languages.tsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { CiGlobe } from 'react-icons/ci';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/core/components/ui/tooltip.tsx';
import { IoInformationCircleOutline } from 'react-icons/io5';

export const FormLanguageSelector = () => {
  const { control, setValue } = useFormContext();

  const translations = useWatch({ control, name: 'translations' }) as any;
  const activeLanguage = useWatch({
    control,
    name: ACTIVE_LANGUAGE_FIELD as any,
  }) as string | undefined;
  const [open, setOpen] = useState(false);
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);

  const normalizeToObject = (raw: any): Record<string, any> => {
    if (!raw) return {};
    if (typeof raw === 'object' && !Array.isArray(raw)) return raw;

    // Si c'est un tableau, convertir en objet
    if (Array.isArray(raw)) {
      const obj: Record<string, any> = {};
      raw.forEach((item) => {
        if (item?.language) {
          obj[item.language] = item.content ?? {};
        }
      });
      return obj;
    }

    return {};
  };

  const translationObject = normalizeToObject(translations);
  const selectedLanguages = Object.keys(translationObject);
  const uniqSelectedLanguages = Array.from(new Set(selectedLanguages));

  useEffect(() => {
    // init active language if not set
    if (!activeLanguage && uniqSelectedLanguages.length > 0) {
      setValue(ACTIVE_LANGUAGE_FIELD as any, TRANSLATION_ORIGINAL_KEY as any);
    }
    // si activeLanguage n'existe plus, fallback original
    if (activeLanguage && activeLanguage !== TRANSLATION_ORIGINAL_KEY) {
      const exists = uniqSelectedLanguages.includes(activeLanguage);
      if (!exists) {
        setValue(ACTIVE_LANGUAGE_FIELD as any, TRANSLATION_ORIGINAL_KEY as any);
      }
    }
  }, [uniqSelectedLanguages.join('|')]);

  const addLanguage = (code: string) => {
    const current = normalizeToObject(translations);
    if (current[code]) return;

    const next = { ...current, [code]: {} };
    setValue('translations', next as any, { shouldDirty: true });
    setValue(ACTIVE_LANGUAGE_FIELD as any, code as any, { shouldDirty: true });
    setOpen(false);
  };

  const removeLanguage = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = normalizeToObject(translations);
    const { [code]: removed, ...next } = current;

    void removed;

    setValue(
      'translations',
      Object.keys(next).length ? (next as any) : (undefined as any),
      {
        shouldDirty: true,
      }
    );

    if (activeLanguage === code) {
      setValue(ACTIVE_LANGUAGE_FIELD as any, TRANSLATION_ORIGINAL_KEY as any, {
        shouldDirty: true,
      });
    }
  };

  const availableToAdd = AVAILABLE_LANGUAGES.filter(
    (lang) => !uniqSelectedLanguages.includes(lang.code)
  );

  return (
    <div className="flex items-start gap-1">
      <div
        onClick={() =>
          setValue(
            ACTIVE_LANGUAGE_FIELD as any,
            TRANSLATION_ORIGINAL_KEY as any,
            { shouldDirty: true }
          )
        }
        className={cn(
          'group relative flex items-center gap-2 px-3 py-2 rounded-t-lg border border-b-0 cursor-pointer transition-all',
          'hover:bg-accent/50',
          !activeLanguage || activeLanguage === TRANSLATION_ORIGINAL_KEY
            ? 'bg-card border-border z-10 shadow-sm'
            : 'bg-muted/30 border-muted'
        )}
      >
        <CiGlobe className="w-5 h-5" />
      </div>
      {uniqSelectedLanguages.map((code) => {
        const language = getLanguageByCode(code);
        if (!language) return null;
        const Flag = language.FlagComponent;

        return (
          <Tooltip key={code}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'group relative flex items-center gap-2 px-3 py-2 rounded-t-lg border border-b-0 cursor-pointer transition-all',
                  'hover:bg-accent/50',
                  activeLanguage === code
                    ? 'bg-card border-border z-10 shadow-sm'
                    : 'bg-muted/30 border-muted'
                )}
                onClick={() =>
                  setValue(ACTIVE_LANGUAGE_FIELD as any, code as any, {
                    shouldDirty: true,
                  })
                }
                onMouseEnter={() => setHoveredLanguage(code)}
                onMouseLeave={() => setHoveredLanguage(null)}
              >
                <Flag className="w-6 h-4 rounded-sm object-cover border border-border shadow-sm" />
                <button
                  type="button"
                  onClick={(e) => removeLanguage(code, e)}
                  className={cn(
                    'ml-1 p-0.5 rounded-full hover:bg-destructive/20 transition-all',
                    hoveredLanguage === code ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <X className="w-3.5 h-3.5 text-destructive" />
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{language.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}

      {availableToAdd.length > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn('gap-2 rounded-b-none rounded-t-lg border-b-0')}
            >
              <Plus className="w-4 h-4" />
              Langue
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2" align="start">
            <div className="space-y-1">
              <div className="flex flex-row justify-between px-2 py-1.5 text-sm font-semibold">
                <h1>Ajouter une langue</h1>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <IoInformationCircleOutline size={19} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="z-[9999] w-48 text-center">
                    <p>
                      Les traductions vides seront automatiquement remplies.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {availableToAdd.map((language) => {
                const Flag = language.FlagComponent;
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => addLanguage(language.code)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left hover:bg-accent"
                  >
                    <Flag className="w-6 h-4 rounded-sm object-cover border border-border" />
                    <span className="flex-1 text-sm">{language.label}</span>
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
