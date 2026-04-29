// components/dialog/dialogue.builder.tsx
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { DialogInterface } from './dialogue.interface';
import { Ionicons } from '@expo/vector-icons';


export default function DialogueBuilder({ dialog }: { dialog: DialogInterface }) {
  if (!dialog.activate) return null;

  return (
    <Modal
      visible={dialog.activate}
      transparent={true}
      animationType="fade"
      onRequestClose={dialog.onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={dialog.onClose}
      >
        <Pressable style={styles.dialogContainer}>
					<View style={styles.titleRow}>
						<Ionicons name="warning" size={24} color="orange" />
						<Text style={styles.title}> {dialog.title}</Text>
					</View>
          <Text style={styles.description}>{dialog.description}</Text>
          
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.cancelButton]}
              onPress={dialog.onClose}
            >
              <Text style={styles.buttonText}>Annuler</Text>
            </Pressable>
            
            <Pressable 
              style={styles.button}
              onPress={dialog.onValid}
            >
              <Text style={styles.buttonText}>Valider</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
	titleRow:{
		flex: 1,
		flexDirection: 'row',
		gap: 5
	},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});