import { Label } from '@/core/components/ui/label.tsx';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormField } from '@/core/interfaces/resource/form-field.interface.tsx';
import { DynamicListInput } from '@/core/components/ui/dynamic-list-input.tsx';
import { useTranslation } from 'react-i18next';

export const FormDynamicListInput = <TEdit extends FieldValues>({
  field,
  control,
}: {
  field: FormField;
  control: Control<TEdit, any>;
}) => {
  const { t } = useTranslation();
  return (
    <div className={'flex-1 space-y-2'}>
			<Label className='w-min whitespace-nowrap relative'>
				{t(field.label || '')} 
				{field.required && <span className="relative text-red-500 top-0 -right-[2px]">*</span>}
			</Label>
      <Controller
        control={control}
        name={field.name as Path<TEdit>}
        render={({ field: fieldProp }) => (
          <DynamicListInput
            field={fieldProp}
            placeholder={t(field.placeholder || '')}
            inputType={field.type}
            addButtonLabel="Ajouter"
            regex={field.regex}
						required={field.name in (field?.fieldErr || {})}
          />
        )}
      />
    </div>
  );
};
