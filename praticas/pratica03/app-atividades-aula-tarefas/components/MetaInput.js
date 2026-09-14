import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagens';

function MetaInput(props) {

  const [inputMetaText, setInputMetaText] = useState('');

  function metaInputHandler(inputText) {
    setInputMetaText(inputText)
  };

  function adicionarMetaHandler() {
    props.onAdicionarMeta(inputMetaText);
    setInputMetaText('');
  }

  return (
    <View style={{flexDirection:'row',
                  justifyContent:'space-between',
                  flex: 1}}>

      <View style={{width:'65%'}}>
        <TextInput style={styles.inputText}
          placeholder={rotulo_input_meta}
          onChangeText={metaInputHandler}
        />
      </View>

      <View style={{width:'30%'}}>
        <Button title={rotulo_btn_cadastro_meta}
          onPress={adicionarMetaHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    borderColor: "#0f3ae8",
    borderWidth: 1,
  },
});

export default MetaInput;