import { View, Platform, StatusBar } from "react-native";
import { Stack } from "expo-router";

export default function AppLayout() {

    return (
        <View style={{ flex: 1, }}>
            <StatusBar translucent={Platform.OS !== "android"} backgroundColor="transparent" barStyle="dark-content" />
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="exercises" />
                    <Stack.Screen name="badge" />
                    <Stack.Screen name="settings" />
                    <Stack.Screen name="team" />
                    <Stack.Screen name="profile" />
                    <Stack.Screen name="ranking" />
                    <Stack.Screen name="social/infinite_scroll" />
                </Stack>
        </View>
    );
}
