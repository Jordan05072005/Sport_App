
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DaConstants from '../constants/DA_constant';

const { height } = Dimensions.get('window');

export default function AnimatedBackground({ children }: { children: React.ReactNode }) {
	const translateY = new Animated.Value(0);

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(translateY, {
					toValue: -height,
					duration: 8000,
					useNativeDriver: true,
				}),
				Animated.timing(translateY, {
					toValue: 0,
					duration: 8000,
					useNativeDriver: true,
				}),
			])
		).start();
	}, []);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.gradientContainer,
					{
						transform: [{ translateY }],
					},
				]}
			>
				<LinearGradient
					colors={[DaConstants.colorBlack, DaConstants.colorStrong, DaConstants.colorBlack, DaConstants.colorLight, DaConstants.colorBlack]}
					style={styles.gradient}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				/>
			</Animated.View>
			<View style={styles.content}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DaConstants.colorBlack,
	},
	gradientContainer: {
		position: 'absolute',
		width: '100%',
		height: height * 2,
		zIndex: -1,  // ← DERRIÈRE tout
	},
	gradient: {
		flex: 1,
	},
	content: {
		flex: 1,
		backgroundColor: 'transparent', // ← ajoute ça
	},
});