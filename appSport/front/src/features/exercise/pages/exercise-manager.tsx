import { createSteps } from '@/src/features/exercise/pages/cruds/form-steps';
import { CrudCreateInterface } from '@/core/pages/crud/crud.interface';
import { exerciseSchema } from '@/src/features/exercise/domaine/resolver/exercise.resolver';

export const crudWorkout: CrudCreateInterface = {
  yup: exerciseSchema,
  hooks: {
    useCreateMutation: () => [async (data: any) => console.log(data)],
  },
  step: createSteps,
};
