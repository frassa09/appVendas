import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext, useState } from 'react'

export default function Inicial({verificarTela, usuario}) {

  const [valueSwitch, setValueSwitch] = useState(false)

  console.log(valueSwitch)

  return ( 
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.botaoMatriz} onPress={() => verificarTela('matriz')}>
                <Text>
                  Matriz 
                </Text>
      </TouchableOpacity>



    <View style={styles.content}>

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


        <TextInput placeholder='Nome da loja' style={styles.input_nome}>
        </TextInput>
        <TextInput placeholder='Breve descrição da loja' style={styles.input_desc}>
        </TextInput>
        <TextInput placeholder='Especialidade (Ex: Sobremesas)' style={styles.input_espec}>
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
          
          <TextInput placeholder='Insira o endereço da sua loja' style={styles.input_endereco}>
          </TextInput>
        </View>

        <View style={styles.botoes_confirm}>

          <TouchableOpacity>
            <Text>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>

        
      </View>

    </View>

    <View style={styles.barra_navegacao}>
      
      
      <TouchableOpacity style={styles.botoes_navegacao_selec}>
        <Text>
          Criar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botoes_navegacao}>
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
      justifyContent: 'center',
      marginBottom: 80
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
      textAlign: 'center',
      borderColor: 'grey'
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
    }
})