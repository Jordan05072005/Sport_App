import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import AnimatedBackground from "@/core/backgrounds/background";
import { Stack } from "expo-router";


import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function Layout() {
  const customTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: 'transparent' },
  };

  return (
      
    <GluestackUIProvider mode="dark">
      <AnimatedBackground>
        <ThemeProvider value={customTheme}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="(app)" />
          </Stack>
        </ThemeProvider>
      </AnimatedBackground>
    </GluestackUIProvider>
  
  );
}