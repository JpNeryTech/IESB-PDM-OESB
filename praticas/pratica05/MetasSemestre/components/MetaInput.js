import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.row}>
      <View style={styles.inputShell}>
        <Text style={styles.inputIcon}>+</Text>
        <TextInput
          style={styles.input}
          placeholder="O que você quer realizar?"
          placeholderTextColor="#89958F"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
      </View>
      <Pressable
        onPress={onAdd}
        android_ripple={{ color: 'rgba(255,255,255,0.35)' }}
        accessibilityLabel="Adicionar meta"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  inputShell: {
    flex: 1,
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2DDD2',
  },
  inputIcon: {
    marginRight: 10,
    color: '#FF7657',
    fontSize: 24,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#203747',
  },
  button: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7657',
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 30,
  },
});
