import FormBuilder from '@/components/form/form.builder';
import { crudWorkout } from '@/src/features/exercise/pages/exercise-manager';

export default function Programmation() {
  return <FormBuilder crud={crudWorkout} isEdit={false} />;
}
