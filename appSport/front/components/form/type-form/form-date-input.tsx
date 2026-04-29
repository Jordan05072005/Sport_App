import { Label } from '@/core/components/ui/label.tsx';
import { FormField } from '@/core/interfaces/resource/form-field.interface.tsx';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/components/ui/popover.tsx';
import { Button } from '@/core/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { Calendar } from '@/core/components/ui/calendar.tsx';
import { useTranslation } from 'react-i18next';

type Props<TEdit extends FieldValues> = {
  field: FormField;
  control: Control<TEdit, any>;
};

export const FormDateInput = <TEdit extends FieldValues>({
  field,
  control,
}: Props<TEdit>) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col gap-y-1 flex-1 space-y-2 ${field?.fieldErr?.[field.name] && 'border animate-border-flash'}`}>
			<Label className='w-min whitespace-nowrap relative'>
				{t(field.label || '')} 
				{field.required && <span className="relative text-red-500 top-0 -right-[2px]">*</span>}
			</Label>
      <Controller
        control={control}
        name={field.name as Path<TEdit>}
				
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {field.value ? (
                  format(field.value, 'PPP', { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};
