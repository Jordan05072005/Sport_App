import { Image } from 'expo-image';
import { ExerciseInterface } from '@/src/features/exercise/domaine/interface/exercise-interface';

export interface WorkoutInterface {
  name: string;
  image: string;
  exercises: ExerciseInterface[];
}
