import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormField } from '@/core/interfaces/resource/form-field.interface.tsx';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Label } from '@/core/components/ui/label.tsx';

export const FormSelectInputWithOption = <TEdit extends FieldValues>({
  field,
  control,
  isMulti,
  className,
}: {
  field: FormField;
  control: Control<TEdit, any>;
  isMulti: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();
  if (!field.optionsComponents) {
    throw `FormSelectInput: field ${field.name} does not have options defined.`;
  }

	const data = field.selectData;
	const option = field.optionsComponents;


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
          const optionsFormatted = data;
          const value = isMulti
            ? optionsFormatted?.filter(
                (opt: any) =>
                  Array.isArray(field.value) && field.value.includes(opt.value)
              )
            : (optionsFormatted?.find(
                (opt: any) => opt.value === field.value
              ) ?? null);
          return (
            <Select
              value={value}
              options={data as any}
              isMulti={isMulti}
              className={`text-black w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg`}
              components={option}
              menuPosition="fixed"
              menuPortalTarget={document.body}
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
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
