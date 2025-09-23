import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Switch, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext, useState } from 'react'
import { endEvent } from 'react-native/Libraries/Performance/Systrace'
import { incluirDados } from '../components/dados_teste'
import * as FileSystem from 'expo-file-system/legacy'
import { gerarID } from '../components/IDs_functions'

export default function Criar({verificarTela}) {


  const [valueSwitch, setValueSwitch] = useState(false)


  const [nomeLoja, setNomeLoja] = useState('')
  const [descLoja, setDescLoja] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  const [endereco, setEndereco] = useState(null)

  const cadastrarLoja = async () => {

    if(!nomeLoja.trim() || !descLoja.trim() || !especialidade.trim()){
      Alert.alert('Algum dos campos obrigatórios ficou vazio')
      return
    }

    const idLoja = await gerarID(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/ids_lojas.json`)
  
    const loja = {
      nomeLoja: nomeLoja.trim(),
      descLoja: descLoja.trim(),
      especialidade: especialidade.trim(),
      endereco: endereco ? endereco : "Nenhum endereço informado",
      idLoja: idLoja
    }

    setNomeLoja('')
    setDescLoja('')
    setEspecialidade('')
    setEndereco(null)
  
    try{

      await incluirDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/lojas_usuarios.json`, loja)

      console.log('Loja criada com sucesso')
      Alert.alert('Sua loja foi criada com sucesso')
    }
    catch(e){
      console.log('Ocorreu um erro ao criar sua loja: ' + e)
      Alert.alert(`Ocorreu um erro ao criar sua loja: ${e}`)
    }
  }

  return ( 
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.botaoMatriz} onPress={() => verificarTela('matriz')}>
                <Text>
                  Matriz 
                </Text>
      </TouchableOpacity>



    <ScrollView style={styles.content}>

      <View style={styles.criar}>
        
        <Text style={styles.titulo}>
          Detalhes da nova loja
        </Text>

        <Text style={styles.desc1}>
          Informações Essenciais
        </Text>

        <Text style={styles.desc2}>
          Preencha os detalhes básicos da sua loja para começar
        </Text>


        <TextInput placeholder='Nome da loja *' value={nomeLoja} style={styles.input_nome} onChangeText={(text) => setNomeLoja(text)}>
        </TextInput>
        <TextInput placeholder='Breve descrição da loja *' value={descLoja} style={styles.input_desc} onChangeText={(text) => setDescLoja(text)}>
        </TextInput>
        <TextInput placeholder='Especialidade (Ex: Sobremesas) *' value={especialidade} style={styles.input_espec} onChangeText={(text) => setEspecialidade(text)}>
        </TextInput>

        <Text style={styles.desc3}>
          Configurações Adicionais
        </Text>

        <Text style={styles.desc4}>
          Ajuste essas configurações caso se aplique a sua loja
        </Text>

        <View style={styles.view_switch}>
          <Text style={styles.desc_switch}>
            Tem loja física
          </Text>

          <Switch style={styles.botao_switch} value={valueSwitch} onValueChange={(newValue) => setValueSwitch(newValue)}>
        </Switch>
        </View>
        
        <View style={[valueSwitch ? styles.ativo : styles.desativado]}>
          
          <TextInput placeholder='Insira o endereço da sua loja' value={endereco} style={styles.input_endereco} onChangeText={(text) => setEndereco(text)}>
          </TextInput>
        </View>

        <View style={styles.botoes_confirm}>

          <TouchableOpacity style={styles.btnCancel} onPress={() => verificarTela('lojas')}>
            <Text style={{color: '#0078BD'}}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnConfirm} onPress={() => cadastrarLoja()}>
            <Text style={{color: 'white'}}>
              Salvar Loja
            </Text>
          </TouchableOpacity>
        </View>

        
      </View>

    </ScrollView>

    <View style={styles.barra_navegacao}>
      
      
      <TouchableOpacity style={styles.botoes_navegacao_selec} onPress={() => verificarTela('inicial')}>
        <Text>
          Criar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botoes_navegacao} onPress={() => verificarTela('lojas')}>
        <Text>
          Lojas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botoes_navegacao}>
        <Text>
          Vendas
        </Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    botaoMatriz: {
        backgroundColor: '#d6b58c',
        borderRadius: 10,
        width: 50,
        alignItems: 'center'
    },
    barra_navegacao: {
      flexDirection: 'row',
      gap: 100,
      justifyContent: 'center',
      borderTopColor: 'grey',
      borderTopWidth: 2,
      marginBottom: 15
    },
    content: {
      flex: 1,
      //justifyContent: 'center',
      marginBottom: 30
    },
    img_inicio: {
      height: 50
    },
    botoes_navegacao: {
      marginTop: 15,
      width: 60,
      alignItems: 'center',
      borderRadius: 8
    },
    criar: {
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 25,
      textAlign: 'left',
      margin: 20,
      fontWeight: 'bold'
    },
    desc1: {
      margin: 20,
      fontWeight: '500',
      marginBottom: 1
    },
    desc2: {
      margin: 20
    },
    input_nome: {
      margin: 20,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 15,
      height: 50
    },
    input_desc: {
      margin: 20,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 15,
      height: 80
    },
    input_espec: {
      margin: 20,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 15,
      height: 50
    },
    botoes_navegacao_selec: {
      marginTop: 15,
      backgroundColor: '#d6d6d6',
      width: 60,
      alignItems: 'center',
      borderRadius: 8
    },
    botao_switch: {
      
    },
    desc3: {
      marginTop: 20,
      marginLeft: 20,
      fontSize: 20
    },
    desc4: {
      alignSelf: 'center',

      marginTop: 20,
      height: 40,
      width: 400,
      borderBottomWidth: 1,
      borderColor: 'grey',
      margin: 20
    },
    view_switch: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20
    },
    desc_switch: {
      fontSize: 20
    },
    ativo: {
      color: 'pink'
    },
    desativado: {
      display: 'none'
    },
    input_endereco: {
      margin: 20,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 15,
      height: 50
    },
    btnCancel: {
      backgroundColor: 'white',
      borderColor: 'grey',
      borderWidth: 0.5,
      alignItems: 'center',
      width: 80,
      height: 40,
      justifyContent: 'center',
      borderRadius: 8
    },
    btnConfirm: {
      backgroundColor: '#0078BD',
      alignItems: 'center',
      width: 80,
      height: 40,
      justifyContent: 'center',
      borderRadius: 8
    },
    botoes_confirm: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 20,
      gap: 10,
      marginTop: 50
    }
})