import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { resgatarDados } from '../components/dados_teste'
import * as FileSystem from 'expo-file-system/legacy'

export default function Login({verificarTela, definirInformacao}) {

  const dirPath = `${FileSystem.documentDirectory}/data/`
  const path = `${dirPath}usuarios.json`


  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const verificarLogin = async () => {

    const DADOS_EXISTENTES = await resgatarDados(dirPath, path)

    const telefoneLimpo = telefone.replaceAll(/\D/g, '')

    for(const i in DADOS_EXISTENTES){

      if(telefoneLimpo.trim() == DADOS_EXISTENTES[i].telefone && senha.trim() == DADOS_EXISTENTES[i].password){
        definirInformacao(DADOS_EXISTENTES[i].id)
        verificarTela('inicial')
        return
      }
    }

    setMensagem('O telefone ou a senha estão incorretos')

    setTimeout(() => {
      setMensagem('')
    }, 4000);
  }




  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.botaoMatriz} onPress={() => verificarTela('matriz')}>
        <Text>
          Matriz
        </Text>
      </TouchableOpacity>

      


      <View style={styles.conteudo}>

      <Image source={require('../imagens/logo.png')} style={styles.logo} resizeMode='contain'></Image>

      <Text style={styles.mensagem}>{mensagem}</Text>
      <Text style={styles.desc}>Telefone</Text>
      <TextInput style={styles.inputs} placeholder='(ddd) 9 xxxx-xxxx' onChangeText={(text) => setTelefone(text)}></TextInput>
      <Text style={styles.desc}>Senha</Text>
      <TextInput style={styles.inputs} placeholder='******' onChangeText={(text) => setSenha(text)}></TextInput>

      <TouchableOpacity onPress={() => verificarLogin()}>
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
  },
  mensagem: {
    textAlign: 'center',
    marginBottom: 8
  }
})