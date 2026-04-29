import { router } from 'expo-router';
import { ScrollView, Text, Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { Plus } from 'lucide-react-native';
import { WorkoutInterface } from '@/src/features/workout/domaine/interface/workout.interface';

export default function ScrollInput({
  onScroll,
  data,
  addElement,
  title,
}: {
  title: string;
  onScroll: (event: any) => void;
  data: WorkoutInterface[];
  addElement: () => void;
}) {
  return (
    <View className="flex-1 p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-white text-2xl font-bold">{title}</Text>
        <Pressable
          className="flex-row items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full"
          onPress={addElement}
        >
          <Plus size={14} color="white" />
          <Text className="text-white text-xs font-medium">Ajouter</Text>
        </Pressable>
      </View>

      {/* Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        onScroll={onScroll}
      >
        {data.map((session, index) => (
          <Pressable
            key={index}
            style={{ marginRight: 12 }}
            onPress={() =>
              router.push({
                pathname: '/exercises/[exercises]',
                params: { exercises: JSON.stringify(session.exercises) },
              })
            }
          >
            <View className="w-[200px] h-[200px] rounded-2xl overflow-hidden">
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: session.image }}
                placeholder="Image"
                contentFit="cover"
                transition={1000}
              />
              <View className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/40">
                <Text
                  className="text-white text-sm font-semibold"
                  numberOfLines={1}
                >
                  {session.name}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
