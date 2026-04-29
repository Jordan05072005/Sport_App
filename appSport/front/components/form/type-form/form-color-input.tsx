import { Label } from '@/core/components/ui/label.tsx';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormField } from '@/core/interfaces/resource/form-field.interface.tsx';
import { ColorInput } from '@/core/components/ui/color-input.tsx';
import { useTranslation } from 'react-i18next';

export const FormColorInput = <TEdit extends FieldValues>({
  field,
  control,
}: {
  field: FormField;
  control: Control<TEdit, any>;
}) => {
  const { t } = useTranslation();
  return (
    <div className={'space-y-2 flex-1'}>
      <Label className="w-min whitespace-nowrap relative">
        {t(field.label || '')}
        {field.required && (
          <span className="relative text-red-500 top-0 -right-[2px]">*</span>
        )}
      </Label>
      <Controller
        control={control}
        name={field.name as Path<TEdit>}
        render={({ field: fieldProp }) => (
          <ColorInput
            defaultValue={fieldProp.value}
            onChange={(color) => fieldProp.onChange(color)}
            className={`${field?.fieldErr?.[field.name] && 'border animate-border-flash'}`}
          />
        )}
      />
    </div>
  );
};

//${field?.fieldErr?.[field.name] && 'animate-border-flash'}
