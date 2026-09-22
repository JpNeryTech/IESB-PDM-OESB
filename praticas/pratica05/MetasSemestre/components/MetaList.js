import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

function formatarData(iso) {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function MetaItem({ item, onDelete, onToggle }) {
  return (
    <View style={[styles.card, item.concluida && styles.cardConcluida]}>
      <Pressable
        onPress={() => onToggle(item.id)}
        android_ripple={{ color: 'rgba(14,124,123,0.12)' }}
        style={({ pressed }) => [styles.cardBody, pressed && styles.pressed]}
      >
        <View style={[styles.check, item.concluida && styles.checkConcluida]}>
          <Text style={styles.checkText}>{item.concluida ? '✓' : ''}</Text>
        </View>
        <View style={styles.cardCopy}>
          <Text style={[styles.texto, item.concluida && styles.textoRiscado]}>
            {item.texto}
          </Text>
          <Text style={styles.data}>Criada em {formatarData(item.criadaEm)}</Text>
          <Text style={styles.dica}>
            {item.concluida ? 'Concluída' : 'Toque para concluir'}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: 'rgba(192,57,43,0.2)' }}
        accessibilityLabel={`Remover meta ${item.texto}`}
        style={({ pressed }) => [styles.deleteBtn, pressed && styles.pressed]}
      >
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </View>
  );
}

export default function MetaList({ metas, onDelete, onToggle }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MetaItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nenhuma meta ainda</Text>
          <Text style={styles.emptyText}>
            Cadastre a primeira meta de estudo do semestre.
          </Text>
        </View>
      }
      contentContainerStyle={metas.length === 0 ? styles.emptyContainer : styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderRadius: 18,
    backgroundColor: '#FFFDF9',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#203747',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#718078',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFDF9',
    borderRadius: 18,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  cardConcluida: {
    backgroundColor: '#F2FBF6',
    borderColor: '#C8E6D6',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
  },
  check: {
    width: 28,
    height: 28,
    marginRight: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF7657',
  },
  checkConcluida: {
    borderColor: '#4FA879',
    backgroundColor: '#4FA879',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  cardCopy: {
    flex: 1,
  },
  pressed: {
    opacity: 0.85,
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#203747',
    marginBottom: 6,
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#718078',
    fontWeight: '500',
  },
  data: {
    fontSize: 12,
    color: '#9A9E95',
    marginBottom: 4,
  },
  dica: {
    fontSize: 12,
    color: '#4FA879',
  },
  deleteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  deleteText: {
    color: '#B77A70',
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 25,
  },
});
