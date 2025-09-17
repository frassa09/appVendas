import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import USUARIO_CONTEXTO from '../components/usuario_context'
import lerDados, { guardarDados, deletarTodosDados } from '../components/funcoes_armazenamento'
import * as FileSystem from 'expo-file-system'
import gerarID from '../components/gerarID'

export default function Cadastro({verificarTela}) {

    const ARQUIVO =  FileSystem.documentDirectory + 'meuApp/data/usuarios.json'
    const {usuario, setUsuario} = useContext(USUARIO_CONTEXTO)

    const [mensagem, setMensagem] = useState('')
    const [username, setUsername] = useState('')
    const [telefone, setTelefone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const cadastrarUsuario = async () => {

        

        console.log('funcao chamada')
        if(username.trim() == '' || telefone.trim() == '' || password.trim() == '' || confirmPassword.trim() == ''){
            setMensagem('Parece que uma caixa ficou vazia')

            setTimeout(() => {
                setMensagem('')    
            }, 4000);
            return
        }

        if(username.includes(' ') || password.includes(' ')){
            setMensagem('Seu nome de usuário e senha não podem conter espaços')

            setTimeout(() => {
                setMensagem('')    
            }, 4000);
            return
        }

        if(password.length < 6 ){
            setMensagem('Sua senha deve conter 6 ou mais caracteres')

            setTimeout(() => {
                setMensagem('')    
            }, 4000);
            return
        }

        if(password !== confirmPassword){
            setMensagem('A senha e a confirmação estão diferentes')

            setTimeout(() => {
                setMensagem('')    
            }, 4000);
            return
        }

        const telefoneLimpo = telefone.replace(/\D/g, '')
        console.log(telefoneLimpo)

        const ID = gerarID()


        const objeto = {
            username: username,
            password: password,
            telefone: telefoneLimpo,
            id: ID
        }

        const DADOS_EXISTENTES = await lerDados(ARQUIVO)

        DADOS_EXISTENTES.map()

        const resposta = await guardarDados(ARQUIVO, objeto)

        console.log(resposta)
    }


  return (

    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.botaoMatriz} onPress={() => verificarTela('matriz')}>
        <Text>
          Matriz 
        </Text>
      </TouchableOpacity>



      <View style={styles.conteudo}>

        <Image source={require('../imagens/img_cadastro.png')} resizeMode='contain' style={styles.img}></Image>

        <Text style={styles.mensagem}>
            {mensagem}
        </Text>

      <Text style={styles.desc}>Nome de Usuário</Text>
    <TextInput placeholder='Seu nome de usuário ("  " -> "_")' style={styles.inputs} value={username} onChangeText={(text) => setUsername(text)}></TextInput>
      <Text style={styles.desc}>Telefone</Text>
      <TextInput placeholder='(ddd) 9 xxxx-xxxx' style={styles.inputs} value={telefone} onChangeText={(text) => setTelefone(text)}></TextInput>
      <Text style={styles.desc}>Senha</Text>
      <TextInput placeholder='Digite sua senha' style={styles.inputs} value={password} onChangeText={(text) => setPassword(text)}></TextInput>
      <Text style={styles.desc}>Confirmar senha</Text>
      <TextInput placeholder='Confirme sua senha' style={styles.inputs} value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)}></TextInput>

      <TouchableOpacity style={styles.btnCad} onPress={() => cadastrarUsuario()}>
        <Text style={styles.textBtnCad}>
            Cadastrar
        </Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.btnCancel} onPress={() => deletarTodosDados(ARQUIVO)}>
        <Text style={styles.textBtnCancel}>
            Cancelar
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
  textBtnCad: {
    textAlign: 'center'
  },
  textBtnCancel: {
    textAlign: 'center'
  },
  btnCad: {
    backgroundColor: '#0077c2',
    padding: 15,
    borderRadius: 7
  },
  btnCancel: {
    marginTop: 10,
    padding: 15,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#dfdfdf'
  },
  img: {
    justifyContent: 'center',
    width: 250
  },
  mensagem: {
    textAlign: 'center',
    width: 250,
    marginBottom: 3
  }
})