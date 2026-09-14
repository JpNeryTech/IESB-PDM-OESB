import { StyleSheet, Text, ScrollView } from "react-native";

function MetasList(props) {
  return (
    <ScrollView style={styles.metaContainer}>
      {props.metas.map((meta, index) => (
        <Text key={index} style={styles.item}>{meta}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  metaContainer: {
    flex: 1,
  },
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#ee35db",
  },
});

export default MetasList;