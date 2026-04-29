import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import AnimatedBackground from '@/core/backgrounds/background';
import Index from './index';
import Programmation from '../exercises/programmation';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Plus } from 'lucide-react-native';
import DaConstants from '@/core/constants/DA_constant';

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState('index');

  return (
    <AnimatedBackground>
      <View style={{ flex: 1 }}>
        {/* Contenu */}
        <View style={{ flex: 1 }}>{activeTab === 'index' && <Index />}</View>

        {/* Tab bar custom */}
        <View style={styles.tabBar}>
          <Pressable style={styles.tab} onPress={() => setActiveTab('index')}>
            <IconSymbol
              size={28}
              name="house.fill"
              color={activeTab === 'index' ? DaConstants.colorLight : '#888'}
            />
          </Pressable>
        </View>
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: DaConstants.colorBlack,
    borderTopColor: DaConstants.colorMedium,
    borderTopWidth: 1,
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
