import { View, StyleSheet, Text, Button } from 'react-native';
import { Image } from 'expo-image';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { repetitionInterface } from '../../domaine/interface/rep.interface';

export default function RepetitionPage({
  data,
  setStep,
  repActual,
}: {
  data: repetitionInterface;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  repActual: number;
}) {
  const [repetetion, setRepetition] = useState('0');

  const onPress = () => {
    //envoyer au back ou a la fin idk
    setStep((prev) => !prev);
  };

  return (
    <View style={styles.parent}>
      <View style={styles.box}>
        <Text style={styles.text}>
          {data.name} n°{repActual}
        </Text>
        <Image
          style={styles.image}
          source={{ uri: data.url }}
          placeholder={'Image'}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.text}>Nombre de Répétition :</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setRepetition}
          value={repetetion}
          placeholder="useless placeholder"
          keyboardType="numeric"
        ></TextInput>
        <Button color={'black'} title="Suivant" onPress={onPress}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000000ff',
  },
  box: {
    width: 500,
    height: 500,
    backgroundColor: '#e4dadaff',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center', // centre le contenu verticalement
    alignItems: 'center', // centre le contenu horizontalement
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textInput: {
    width: 50,
    height: 50,
    borderWidth: 1, // épaisseur de la bordure
    borderColor: '#ccc', // couleur de la bordure
    borderRadius: 4,
    color: '#000', // couleur du texte
    fontSize: 16, // taille du texte
    fontWeight: 'bold', // poids du texte (normal, bold, 100..900)
    textAlign: 'center', // alignement (left, center, right)
  },
});
