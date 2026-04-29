import { View, Text, Switch } from 'react-native';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';

export const FormCheckBoxInput = <TEdit extends FieldValues>({
  field,
}: any) => {
  // const { t } = useTranslation();
  const t = (string: any) => string;
  const { control } = useFormContext<TEdit>();

  return (
    <View className="flex-row items-center gap-2">
      <Controller
        name={field.name as Path<TEdit>}
        control={control}
        render={({ field: f }) => (
          <Switch value={f.value} onValueChange={f.onChange} />
        )}
      />
      <Text className="text-sm">
        {t(field.label || '')}
        {field.required && <Text className="text-red-500"> *</Text>}
      </Text>
    </View>
  );
};
