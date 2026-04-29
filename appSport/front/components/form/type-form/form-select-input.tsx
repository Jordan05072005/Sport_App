import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormField } from '@/core/interfaces/resource/form-field.interface.tsx';
import Select from 'react-select';
import { useState } from 'react';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Label } from '@/core/components/ui/label.tsx';

export const FormSelectInput = <TEdit extends FieldValues>({
  field,
  control,
  isMulti,
  className,
  params,
}: {
  field: FormField;
  control: Control<TEdit, any>;
  isMulti: boolean;
  className?: string;
  params?: object;
}) => {
  const { t } = useTranslation();
  if (!field.options) {
    throw `FormSelectInput: field ${field.name} does not have options defined.`;
  }

  const [sorting] = useState<SortingState>([]);
  const [columnFilters] = useState<ColumnFiltersState>([]);

  const { data } = field.options!(
    params
      ? params
      : {
          page: '1',
          limit: '1000',
          sorting,
          columnFilters,
        }
  );

  const FormatOptionValue = (option?: any[]) => {
    if (!option || !Array.isArray(option)) return [];

    return option
      .filter((item) => item && item._id && (item.name || item.question))
      .map((item) => ({
        value: item._id,
        label: item.name || item.question,
      }));
  };

  return (
    <div
      className={`space-y-2 ${className} ${field?.fieldErr?.[field.name] && 'border animate-border-flash'}`}
    >
      {field.label && (
        <Label className="w-min whitespace-nowrap relative">
          {t(field.label || '')}
          {field.required && (
            <span className="relative text-red-500 top-0 -right-[2px]">*</span>
          )}
        </Label>
      )}
      <Controller
        control={control}
        name={field.name as Path<TEdit>}
        render={({ field }) => {
          const optionsFormatted = FormatOptionValue(data?.body?.elements);
          const value = isMulti
            ? optionsFormatted.filter(
                (opt) =>
                  Array.isArray(field.value) && field.value.includes(opt.value)
              )
            : (optionsFormatted.find((opt) => opt.value === field.value) ??
              null);
          return (
            <Select
              value={value}
              options={FormatOptionValue(data?.body?.elements) as any}
              isMulti={isMulti}
              className={`text-black w-full`}
              onChange={(val) => {
                if (isMulti) {
                  field.onChange(val ? (val as any[]).map((v) => v.value) : []);
                } else {
                  field.onChange(val ? (val as any).value : null);
                }
              }}
              onBlur={field.onBlur}
            />
          );
        }}
      />
    </div>
  );
};
