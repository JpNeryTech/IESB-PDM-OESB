import { StyleSheet, View, Image, Text } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetasList from './components/MetasList';
import MetaInput from './components/MetaInput';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [metas, setMetas] = useState([]);

  // Carrega a lista ao abrir o app
  useEffect(() => {
    async function carregarDados() {
      const dadosSalvos = await AsyncStorage.getItem('@listaTarefas');
      if (dadosSalvos) {
        setMetas(JSON.parse(dadosSalvos));
        console.log('Dados carregados do AsyncStorage:', JSON.parse(dadosSalvos));
      }
    }
    carregarDados();
  }, []);

  // Salva a lista no AsyncStorage sempre que ela for alterada
  useEffect(() => {
    AsyncStorage.setItem('@listaTarefas', JSON.stringify(metas));
    console.log('Dados armazenados do AsyncStorage:', JSON.stringify(metas));
  }, [metas]);

  function adicionarMetaHandler(inputMeta) {
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
            source={require('./assets/favicon.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Minhas Metas</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 30,
  },

  image: {
    width: 50,
    height: 50,
  },

  appTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});