import { FormProvider, useForm } from 'react-hook-form';
import {
  CrudCreateInterface,
  CrudEditInterface,
} from '@/core/pages/crud/crud.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormType } from '@/components/form/form.interface';
import { FormTextInput } from '@/components/form/type-form/form-text-input';
import { FormTextAreaInput } from '@/components/form/type-form/form-text-area-input';
import { FormCheckBoxInput } from '@/components/form/type-form/form-checkbox-input';
import { Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { FormImageInput } from '@/components/form/type-form/form-image-input';
import { useState } from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
export default function FormBuilder({
  crud,
  isEdit,
}: {
  crud: CrudEditInterface | CrudCreateInterface;
  //yup
  isEdit: boolean;
}) {
  const methods = useForm({
    // defaultValues: <>
    resolver: yupResolver(crud.yup),
  });
  const [step, setStep] = useState(0);
  const onChangeStep = () => {
    setStep(step + 1);
  };

  const onSubmit = () => {
    methods.handleSubmit((data) => {
      console.log(data);
    })();
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-100 overflow-y-scroll">
      <Card className="w-[95%] h-[95%] bg-white rounded-2xl shadow-md overflow-scroll">
        {/* Header */}
        <View className="px-6 pt-6 pb-4 border-b border-slate-100">
          <Text className="text-2xl font-bold text-slate-800 tracking-tight">
            {crud.step[step].title}
          </Text>
          <Text className="text-sm text-slate-400 mt-1">
            {isEdit ? 'Modifier les informations' : 'Remplir les informations'}
          </Text>
        </View>

        {/* Body */}
        <View className="flex-1 px-6 py-6 gap-6">
          <FormProvider {...methods}>
            {crud.step[step].section.map((section, index) => (
              <View
                key={index}
                className={
                  section.layout === 'row'
                    ? 'flex-row w-full gap-4 items-start'
                    : section.layout === 'column'
                      ? 'flex-col w-full gap-4'
                      : 'items-center justify-center'
                }
              >
                {section.fields.map((field: any, index: number) => {
                  switch (field.type) {
                    case FormType.Text:
                    case FormType.Email:
                    case FormType.Password:
                    case FormType.Number:
                      return (
                        <FormTextInput
                          key={index}
                          field={field}
                          originalName={field.name}
                          className="flex-1 min-w-0"
                        />
                      );
                    case FormType.TextArea:
                      return <FormTextAreaInput key={index} field={field} />;
                    case FormType.Checkbox:
                      return <FormCheckBoxInput key={index} field={field} />;
                    case FormType.Image:
                      return <FormImageInput key={index} field={field} />;
                  }
                })}
              </View>
            ))}
          </FormProvider>
        </View>
      </Card>
      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between px-6 pb-6 pt-3 bg-white border-t border-slate-100">
        {step !== 0 && (
          <Button action="default" onPress={() => setStep(step - 1)}>
            <ButtonIcon as={ChevronLeft} color="#0f172a" />
            <ButtonText>Précédent</ButtonText>
          </Button>
        )}
        <Button
          action="default"
          onPress={crud.step.length - 1 !== step ? onChangeStep : onSubmit}
          className="flex-row items-center gap-2 ml-auto"
        >
          <ButtonText>
            {crud.step.length - 1 !== step
              ? 'Suivant'
              : isEdit
                ? 'Sauvegarder'
                : 'Créer'}
          </ButtonText>
          <ButtonIcon as={ChevronRight} color="#0f172a" />
        </Button>
      </View>
    </View>
  );
}
