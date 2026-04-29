import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar, useColorScheme } from 'react-native';

export default function Layouttest() {
  return (
    <Stack>
      <Stack.Screen
        name="[exercises]"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: '',
          headerTransparent: true,
        }}
      />{' '}
      <Stack.Screen
        name="programmation"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: '',
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
