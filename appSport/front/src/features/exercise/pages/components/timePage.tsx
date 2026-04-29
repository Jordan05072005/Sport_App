import { View, StyleSheet, Text, Button, Pressable, Dimensions, TextInput} from 'react-native';
import { useEffect, useRef, useState } from "react";
import { Audio } from 'expo-av';
import { DialogInterface } from '@/components/dialog/dialogue.interface';
import DialogueBuilder from '@/components/dialog/dialogue.builder';



export default function Timer({timeLimit, setStep}: {
	timeLimit: string,
	setStep: React.Dispatch<React.SetStateAction<boolean>>
})
{
	const [time, setTime] = useState(timeLimit);
	const [running, setRunning] = useState(0)
	const soundRef = useRef<Audio.Sound | null>(null);
	const [activate, setActivate] = useState(false)

	const dialog: DialogInterface = {
		title: "Valider sans repos ?",
		description:"Êtes vous sûr de vouloir continuer sans prendre de récupération ?",
		activate: activate,
		setActivate: setActivate,
		onValid: ()=> {setStep(prev => !prev)},
		onClose: ()=> setActivate(false)
	}

	useEffect(() => {
		let timer: number;
		let timeNumber: number = parseInt(time)
		if (timeNumber > 0 && running)
			timer = setInterval(() => {
				setTime((timeNumber - 1).toString());
			}, 1000);
		if (timeNumber <= 0 && running == 1){
			startTimerSound();
			setRunning(3);
		}
		return () => {
      if (timer) clearInterval(timer);
    };
	}, [time, running])


	const startTimerSound = async() => {
		const { sound } = await Audio.Sound.createAsync(
      {uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'}
    );
		soundRef.current = sound;
    await sound.playAsync();
	}

	const endTimerSound = async () => {
		if (soundRef.current) {
			console.log("stooop");
			await soundRef.current.stopAsync();
			await soundRef.current.unloadAsync();
			soundRef.current = null;
		}
	}

	const handlePress = async() => {
		if (running == 0)
			return setRunning(1);
		if (running == 1)
			return setRunning(0);
		setTime(timeLimit);
		setRunning(0);
		await endTimerSound()
	}

 return (
	<View style={styles.parent}>
    <View style={styles.timer}>
      <TextInput style={styles.textInput} value={time} onChangeText={(time) => {if (running != 1 &&time.length < 10) setTime(time)}} keyboardType="numeric"></TextInput>
    </View>
      <Pressable
				onPress={handlePress}
				style={styles.button}
			>
				<Text style={styles.text}>
					{running == 0 ? "Start" : running == 1 ? "Pause" : "Reset"}
				</Text>
			</Pressable>

			<Pressable
				onPress={() => {dialog.setActivate(true)}}
				style={styles.button}
			>
				<Text style={styles.text}>
					Continuer
				</Text>
			</Pressable>
			<DialogueBuilder dialog={dialog}></DialogueBuilder>
		</View>
  );
}

  // const [sound, setSound] = useState<Audio.Sound | null>(null);

  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require('./assets/bip.mp3') // fichier mp3 local
  //   );
  //   setSound(sound);
  //   await sound.playAsync();
  // }

	// https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3

const window = Dimensions.get("window");
const isMobile = window.width < 768;
const circleSize = isMobile ? window.width * 0.75 : 400;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    fontSize: 48,
    marginBottom: 20,
		color: "white",
		textAlign: 'center',
		borderWidth: 0,
		maxWidth: circleSize - 10
  },
	button: {
		backgroundColor: "blue",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 12,
		margin: 8,
		width: circleSize / 2,
		height: (circleSize / 2) / 4
	},
	text:{
		color: "white",
		fontSize: 18,
		textAlign: 'center'
	}
});