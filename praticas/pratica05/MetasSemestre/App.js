import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false);

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.filter((meta) => meta.concluida).length;
  const progresso = metas.length ? Math.round((concluidas / metas.length) * 100) : 0;

  // Carrega as metas persistidas na montagem do app.
  useEffect(() => {
    async function carregarMetas() {
      try {
        const bruto = await AsyncStorage.getItem(STORAGE_KEY);
        if (bruto) {
          const parsed = JSON.parse(bruto);
          setMetas(Array.isArray(parsed) ? parsed : []);
        }
      } catch (erro) {
        Alert.alert(
          'Não foi possível carregar',
          'Houve um problema ao ler as metas salvas neste aparelho.'
        );
      } finally {
        setCarregado(true);
      }
    }

    carregarMetas();
  }, []);

  // Salva a lista sempre que ela mudar (depois da carga inicial).
  useEffect(() => {
    if (!carregado) {
      return;
    }

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert(
          'Não foi possível salvar',
          'Suas metas estão na tela, mas não puderam ser gravadas no aparelho.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregado]);

  function handleAdd() {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert('Campo vazio', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((listaAtual) => [novaMeta, ...listaAtual]);
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((listaAtual) => listaAtual.filter((meta) => meta.id !== id));
  }

  function handleToggle(id) {
    setMetas((listaAtual) =>
      listaAtual.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>+</Text>
            </View>
            <Text style={styles.eyebrow}>PLANEJAMENTO ACADÊMICO</Text>
            <Image source={require('./assets/icon.png')} style={styles.logo} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.subtitle}>Pequenos passos. Grandes entregas.</Text>
          </View>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>PROGRESSO GERAL</Text>
              <Text style={styles.progressValue}>{progresso}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progresso}%` }]} />
            </View>
            <View style={styles.statsRow}>
              <View>
                <Text style={styles.statNumber}>{pendentes}</Text>
                <Text style={styles.statLabel}>em andamento</Text>
              </View>
              <View style={styles.statDivider} />
              <View>
                <Text style={styles.statNumber}>{concluidas}</Text>
                <Text style={styles.statLabel}>concluídas</Text>
              </View>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeText}>{metas.length} {metas.length === 1 ? 'meta' : 'metas'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Próximos passos</Text>
          <MetaInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdd}
          />
          <MetaList
            metas={metas}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F3EC',
  },
  header: {
    backgroundColor: '#203747',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandMark: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7657',
  },
  brandMarkText: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '700',
  },
  eyebrow: {
    marginLeft: 10,
    color: '#B9D1D1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 9,
    marginLeft: 'auto',
  },
  headerText: {
    marginTop: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#B9D1D1',
  },
  progressCard: {
    marginTop: 20,
    backgroundColor: '#2C4955',
    borderRadius: 18,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    color: '#B9D1D1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  progressValue: {
    color: '#D8F3E8',
    fontSize: 20,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#42616A',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#D8F3E8',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 2,
    color: '#B9D1D1',
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 18,
    backgroundColor: '#52717A',
  },
  statBadge: {
    marginLeft: 'auto',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#FF7657',
  },
  statBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  sectionTitle: {
    marginBottom: 12,
    color: '#203747',
    fontSize: 19,
    fontWeight: '800',
  },
});
