import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormField } from '@/core/interfaces/resource/form-field.interface.tsx';
import { useTranslation } from 'react-i18next';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/core/components/ui/toggle-group';
import { Label } from '@/core/components/ui/field.tsx';
import { ConditionalDialog } from '@/core/components/dialog/dialog-wrapper.tsx';
import { useState } from 'react';

export const FormCheckboxCase = <TEdit extends FieldValues>({
  field: fields,
  onValid,
  isPending,
}: {
  field: FormField;
  onValid: (() => void) | undefined;
  isPending?: boolean;
}) => {
  const { control } = useFormContext<TEdit>();
  const [openDialog, setOpenDialog] = useState(false);
  const [valueDialog, setValueDialog] = useState({});

  const { t } = useTranslation();
  return (
    <div
      className={`w-full space-y-2 ${fields?.fieldErr?.[fields.name] && 'border animate-border-flash'}`}
    >
      {fields?.label && (
        <Label className="w-min whitespace-nowrap relative">
          {t(fields.label || '')}
          {fields.required && (
            <span className="relative text-red-500 top-0 -right-[2px]">*</span>
          )}
        </Label>
      )}
      <Controller
        control={control}
        name={fields.name as Path<TEdit>}
        render={({ field: { value, onChange } }) => (
          <ToggleGroup
            type="single"
            className={'flex-wrap gap-2 w-full h-full'}
            value={String(value)}
            onValueChange={(val) => {
              onChange(val.value == 'true');
              console.log(val.valueForDialog);
              if (onValid && val.valueForDialog) {
                setOpenDialog(true);
                setValueDialog(val.valueForDialog);
              } else if (onValid && !isPending) onValid();
            }}
          >
            {fields?.elements?.map((element: any, index: number) => (
              <ToggleGroupItem
                className={
                  element.classname +
                  ` aspect-square ${onValid ? 'data-[state=on]:border-input data-[state=on]:border' : ''}`
                }
                key={index}
                value={element}
              >
                <div className="relative h-full w-full overflow-visible">
                  {element.background}
                  <div className="flex flex-col justify-center h-full gap-2 items-center">
                    <span className="text-5xl font-extrabold bottom">
                      {element.name}
                    </span>
                    <span className="text-sm">{element.description}</span>
                  </div>
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      />
      {onValid ? (
        <ConditionalDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          handleNext={onValid}
          isPending={isPending}
          data={{
            title: valueDialog.title,
            description: valueDialog.description,
            boutonLabel: 'Valider',
            className: 'max-h-[88vh] max-w-lg',
          }}
        />
      ) : null}
    </div>
  );
};
