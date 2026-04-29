import { useFormContext, Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Input, InputField } from '@/components/ui/input';

export function FormTextInput({
  field,
  originalName,
  className,
}: {
  field: any;
  originalName: string;
  className?: string;
}) {
  const t = (key: string) => key;
  const { control } = useFormContext();

  const { fieldErr, translatable, ...fieldProps } = field;

  return (
    <View className={`${className || ''}`}>
      <View className="space-y-2 p-4">
        {/* Hauteur fixe pour le label, input toujours aligné */}
        <View className="h-6 justify-end items-center">
          {field.label && (
            <Text
              className="text-sm font-medium"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {t(field.label || '')}
              {field.required && <Text className="text-red-500"> *</Text>}
            </Text>
          )}
        </View>

        <Controller
          name={field.name}
          control={control}
          render={({ field: f }) => (
            <Input>
              <InputField
                {...fieldProps}
                placeholder={t(field.placeholder || '')}
                value={f.value ?? ''}
                onChangeText={f.onChange}
                onBlur={f.onBlur}
                style={{ color: 'black' }}
                className="text-black"
              />
            </Input>
          )}
        />
      </View>
    </View>
  );
}
