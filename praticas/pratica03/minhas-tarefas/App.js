import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util';
import paraIssoServeOTituloDefault from './util';
//não precisou colocar entre chaves

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{margin:20}}>{titulo}</Text>
      <Text style={styles.text}>{paraIssoServeOTituloDefault}</Text>
      <Button title="Clique aqui" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
    fontSize: 26,
    color: 'green', 
  },
});
