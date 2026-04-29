import {
  Controller,
  FieldValues,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormFieldInterface } from '@/components/form/form.interface';
import { Label } from '@react-navigation/elements';
import { TextInput, View } from 'react-native';

export const FormTextAreaInput = <TEdit extends FieldValues>({
  field,
}: {
  field: FormFieldInterface<TEdit>;
}) => {
  // const { t } = useTranslation();
  const t = (key: string) => key;
  const { control, setValue, getValues } = useFormContext();

  const [currentValue, setCurrentValue] = useState<string>('');

  return (
    <View className={'flex-1 space-y-2'} key={String(field.name)}>
      <View className="flex items-center space-x-2">
        <Label className="w-min whitespace-nowrap relative">
          {t(field.label || '')}
          {/*{field.required && (*/}
          {/*  <span className="relative text-red-500 top-0 -right-[2px]">*</span>*/}
          {/*)}*/}
        </Label>
        {field.maxLength != null && (
          <span className="text-sm" style={{ color: 'var(--cohelio-vert)' }}>
            {currentValue?.length || 0} / {field.maxLength}
          </span>
        )}
      </View>
      <Controller
        control={control}
        name={field.name}
        render={({ field: fieldProp }) => (
          <TextInput
            multiline
            id={field.name}
            placeholder="Décrivez la pédagogie, objectif pédagogique..."
            className={`resize-none max-w-[725px] p-2 mb-3 rounded-xl h-20 `} //${field?.fieldErr?.[field.name] && 'animate-border-flash'}
            maxLength={field.maxLength}
            {...fieldProp}
            onChangeText={(value) => {
              fieldProp.onChange(value);
              setCurrentValue(value);
            }}
          />
        )}
      />
    </View>
  );
};
