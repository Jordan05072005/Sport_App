import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Pressable, Text, View, LayoutChangeEvent } from 'react-native';
import { Upload, Pencil, X } from 'lucide-react-native';
import { FormFieldInterface } from '@/components/form/form.interface';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

type Props<TEdit extends FieldValues> = {
  field: FormFieldInterface<TEdit>;
};

export const FormImageInput = <TEdit extends FieldValues>({
  field,
}: Props<TEdit>) => {
  const t = (key: string) => key;
  const [preview, setPreview] = useState<string | null>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext<TEdit>();

  const error = errors[field.name]?.message as string | undefined;

  useEffect(() => {
    const initialValue = control._formValues[field.name];
    if (!initialValue) return;

    if (typeof initialValue === 'string') {
      setPreview(initialValue);
    } else {
      const url = initialValue?.medium?.fileUrl
        ? encodeURI(initialValue.medium.fileUrl)
        : initialValue?.image?.medium?.fileUrl
          ? encodeURI(initialValue.image.medium.fileUrl)
          : null;
      setPreview(url);
    }
  }, [control._formValues, field.name]);

  const pickImage = async (onChange: (uri: string | null) => void) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPreview(uri);
      onChange(uri);
    }
  };

  const clearImage = (onChange: (uri: null) => void) => {
    setPreview(null);
    onChange(null);
  };

  return (
    <View className="w-full gap-1">
      {/* Label */}
      {field.label && (
        <View className="flex-row items-center mb-1">
          <Text className="text-sm font-medium text-slate-700">
            {t(field.label)}
          </Text>
          {field.required && (
            <Text className="text-red-500 ml-0.5 text-sm">*</Text>
          )}
        </View>
      )}

      <Controller
        control={control}
        name={field.name as Path<TEdit>}
        render={({ field: { onChange } }) => (
          <View
            style={{ height: 200 }}
            className={`
              w-full rounded-xl overflow-hidden border
              ${error ? 'border-red-400' : 'border-slate-200'}
              ${preview ? '' : 'border-dashed bg-slate-50'}
            `}
          >
            {preview ? (
              <View className="flex-1 ">
                <Image
                  source={{ uri: preview }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />

                <View className="absolute inset-0 flex-row items-end justify-between p-3">
                  {/* Edit button */}
                  <Pressable
                    onPress={() => pickImage(onChange)}
                    className="flex-row items-center gap-1.5 bg-black/60 px-3 py-2 rounded-lg"
                  >
                    <Pencil size={14} color="white" />
                    <Text className="text-white text-xs font-medium">
                      Modifier
                    </Text>
                  </Pressable>

                  {/* Delete button */}
                  <Pressable
                    onPress={() => clearImage(onChange)}
                    className="items-center justify-center bg-black/60 p-2 rounded-lg"
                  >
                    <X size={14} color="white" />
                  </Pressable>
                </View>
              </View>
            ) : (
              /* ── Upload zone ── */
              <Pressable
                onPress={() => pickImage(onChange)}
                className="flex-1 items-center justify-center gap-3 py-10 border-2"
              >
                <View className="bg-slate-200 rounded-full p-4">
                  <Upload size={24} color="#64748b" />
                </View>
                <View className="items-center gap-1">
                  <Text className="text-slate-700 text-sm font-medium">
                    Choisir une image
                  </Text>
                  <Text className="text-slate-400 text-xs">JPG, PNG, WEBP</Text>
                </View>
              </Pressable>
            )}
          </View>
        )}
      />

      {/* Error */}
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};
