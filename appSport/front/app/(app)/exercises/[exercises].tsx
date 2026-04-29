import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { repetitionInterface } from '@/src/features/exercise/domaine/interface/rep.interface';
import { useEffect, useState } from 'react';
import Timer from '@/src/features/exercise/pages/components/timePage';
import RepetitionPage from '@/src/features/exercise/pages/components/rep-page';

// get -> name

export default function ExercisesPage() {
  const { exercises } = useLocalSearchParams<{ exercises?: string }>();
  const data = exercises
    ? (JSON.parse(exercises) as repetitionInterface[])
    : [];
  const [step, SetStep] = useState(0);
  const [rep, setRep] = useState(0);
  const [recupoff, setRecupOff] = useState(true);

  useEffect(() => {
    if (step >= (data?.length ?? 0)) {
      router.push('/');
      return;
    }
    if (data && recupoff) setRep((prev) => prev + 1);
    if (data[step].repetition <= rep && recupoff) {
      SetStep((prev) => prev + 1);
      setRep(0);
    }
  }, [recupoff, data, step]);

  return (
    <View style={styles.parent}>
      {step < data.length ? (
        recupoff ? (
          <RepetitionPage
            data={data[step]}
            setStep={setRecupOff}
            repActual={rep}
          ></RepetitionPage>
        ) : (
          <Timer timeLimit={data[step].recupTime} setStep={setRecupOff}></Timer>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#000000ff',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});
