import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import USUARIO_CONTEXTO from '../components/usuario_context'
import { Dimensions } from 'react-native'

export default function Login({verificarTela}) {

  const {usuario, setUsuario} = useContext(USUARIO_CONTEXTO)


  return (

    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.botaoMatriz} onPress={() => verificarTela('matriz')}>
        <Text>
          Matriz
        </Text>
      </TouchableOpacity>

      


      <View style={styles.conteudo}>

      <Image source={require('../imagens/logo.png')} style={styles.logo} resizeMode='contain'></Image>

      <Text style={styles.desc}>Telefone</Text>
      <TextInput style={styles.inputs} placeholder='(ddd) 9 xxxx-xxxx'></TextInput>
      <Text style={styles.desc}>Senha</Text>
      <TextInput style={styles.inputs} placeholder='******'></TextInput>

      <TouchableOpacity>
        <Text style={styles.textBtnLgn}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => verificarTela('cadastro')}>
        <Text style={styles.textBtnCad}>
          Criar Nova Conta
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
    alignItems: 'center'
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center'
  },
  botaoMatriz: {
    backgroundColor: '#d6b58c',
    borderRadius: 10,
    width: 50,
    alignItems: 'center'
  },
  inputs: {
    borderColor: '#dfdfdf',
    borderWidth: 2,
    borderRadius: 7,
    width: 250,
    marginBottom: 15,
    paddingStart: 10
  },
  desc: {
     marginBottom: 8,
     color: '#808080'
  },
  textBtnLgn: {
    textAlign: 'center',
    backgroundColor: '#0077c2',
    color: 'white',
    padding: 15,
    borderRadius: 7,
    marginTop: 8
  },
  textBtnCad: {
    textAlign: 'center',
    color: '#0077c2',
    padding: 30,
  },
  logo: {
    justifyContent: 'center',
    width: 250
  }
})