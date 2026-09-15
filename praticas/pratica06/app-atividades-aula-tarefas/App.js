import { StyleSheet, View, Image } from 'react-native';
import { useState } from 'react';
import MetasList from './components/MetasList';
import MetaInput from './components/MetaInput';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    // Cria um objeto com id único e o texto da meta
    const novaMeta = { id: Math.random().toString(), texto: inputMeta };
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandler(id) {
    const novasMetas = metas.filter(meta => meta.id !== id);
    setMetas(novasMetas);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/favicon.png')} // troque pelo caminho da sua imagem
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.mainContainer}>

          <MetaInput onAddMeta={adicionarMetaHandler} />

          <View style={styles.metaContainer}>
            <MetasList array={metas} onDeleteItem={deletarMetaHandler} />
          </View>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },

  metaContainer: {
    flex: 15,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imageContainer: {
    alignItems: 'left',
    marginTop: 10,
    paddingLeft: 30,
  },

  image: {
    width: 50,
    height: 50,
  },
});