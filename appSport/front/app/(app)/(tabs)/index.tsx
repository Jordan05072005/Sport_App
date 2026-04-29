import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScrollInput from '../../../components/scroll/scrollInput';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { repetitionInterface } from '@/src/features/exercise/domaine/interface/rep.interface';
import { WorkoutInterface } from '@/src/features/workout/domaine/interface/workout.interface';
import { ExerciseInterface } from '@/src/features/exercise/domaine/interface/exercise-interface';
import { navigate } from 'expo-router/build/global-state/routing';
import { router } from 'expo-router';

const dataAll: WorkoutInterface[] = [
  {
    name: 'pec',
    image:
      'https://www.shutterstock.com/shutterstock/videos/1017371524/thumb/1.jpg?ip=x480',
    exercises: [
      {
        name: 'bench',
        image:
          'https://www.shutterstock.com/shutterstock/videos/1017371524/thumb/1.jpg?ip=x480',
        recupTime: '2',
        nbrRepetitions: 2,
        nbrSets: 2,
        tips: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.',
      },
      {
        name: 'bench2',
        image:
          'https://www.shutterstock.com/shutterstock/videos/1017371524/thumb/1.jpg?ip=x480',
        recupTime: '3',
        nbrRepetitions: 2,
        nbrSets: 2,
      },
    ] as ExerciseInterface[],
  },
  {
    name: 'pec',
    image:
      'https://www.shutterstock.com/shutterstock/videos/1017371524/thumb/1.jpg?ip=x480',
    exercises: [
      {
        name: 'bench',
        image:
          'https://www.shutterstock.com/shutterstock/videos/1017371524/thumb/1.jpg?ip=x480',
        recupTime: '2',
        nbrRepetitions: 2,
        nbrSets: 2,
        tips: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.',
      },
      {
        name: 'bench2',
        image:
          'https://www.shutterstock.com/shutterstock/videos/1017371524/thumb/1.jpg?ip=x480',
        recupTime: '3',
        nbrRepetitions: 2,
        nbrSets: 2,
      },
    ] as ExerciseInterface[],
  },
];

export default function HomePage() {
  const addWorkout = () => {
    // a changer dirige vers add exercice
    router.push({
      pathname: '/exercises/programmation',
    });
  };
  return (
    <SafeAreaProvider className="flex-1">
      <Text className="text-white text-2xl font-bold text-center mb-3">
        BLA
      </Text>
      <ScrollInput
        data={dataAll}
        title={'Entrainement'}
        onScroll={() => {}}
        onClick={() => {}} //+ passer par un store pr savoir quel exercice
        addElement={addWorkout}
      />
    </SafeAreaProvider>
  );
}
