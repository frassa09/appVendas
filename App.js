import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Login from './telas/Login'
import Cadastro from './telas/Cadastro'
import Inicial from './telas/Inicial'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Navigation() {

    const [tela, setTela] = useState('matriz')
    const [usuario, setUsuario] = useState('')

    const verificarTela = (tela) => {
        setTela(tela)
    }

    const definirInformacao = (informacao) => {
    setUsuario(informacao)
  }

    const escolherTela = () => {

      switch(tela){
        case 'login': return <Login verificarTela={verificarTela} definirInformacao={definirInformacao}></Login>
        case 'cadastro': return <Cadastro verificarTela={verificarTela}></Cadastro>
        case 'inicial': return <Inicial verificarTela={verificarTela} usuario={usuario}></Inicial>
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
        <TouchableOpacity style={styles.botoes} onPress={() => {setTela('inicial')}}>
          <Text>
          Inicial
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
