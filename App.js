import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Login from './telas/Login'
import Cadastro from './telas/Cadastro'
import Criar from './telas/Criar'
import Lojas from './telas/Lojas'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deletarTodosDados } from './components/dados_teste'
import * as FileSystem from 'expo-file-system/legacy'

export default function Navigation() {

    const [tela, setTela] = useState('matriz')
    const [id, setId] = useState('')

    const verificarTela = (tela) => {
        setTela(tela)
    }

    const apagarDados = async () => {

      await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/usuarios.json`)
      await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/lojas_usuarios.json`)
      await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/ids_cad.json`)
      await deletarTodosDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/ids_lojas.json`)
    }

    const definirInformacao = (informacao) => {
    setId(informacao)
  }

    const escolherTela = () => {

      switch(tela){
        case 'login': return <Login verificarTela={verificarTela} definirInformacao={definirInformacao}></Login>
        case 'cadastro': return <Cadastro verificarTela={verificarTela}></Cadastro>
        case 'criar': return <Criar verificarTela={verificarTela} id={id}></Criar>
        case 'lojas': return <Lojas verificarTela={verificarTela} id={id}></Lojas>
        default: return <Login verificarTela={verificarTela}></Login>
      }
    }


  return (
      <SafeAreaView style={styles.container}>
      {tela == 'matriz' ? (
        <View style={styles.div}>
          <Text style={styles.titulo}>
            Matriz
          </Text>
        <TouchableOpacity style={styles.botoes} onPress={() => {setTela('login')}}>
          <Text>
          Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoes} onPress={() => {setTela('cadastro')}}>
          <Text>
          Cadastro
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoes} onPress={() => {setTela('criar')}}>
          <Text>
          Criar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoes} onPress={() => {setTela('lojas')}}>
          <Text>
          Lojas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoes} onPress={() => apagarDados()}>
          <Text>
          Apagar todos os dados
          </Text>
        </TouchableOpacity>
        </View>
      ): escolherTela()}
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  botoes: {
    backgroundColor: '#d2c8a7',
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  div: {
    alignItems: 'center'
  },
  titulo: {
    fontSize: 80,
    color: '#c0b698'
  }
})
