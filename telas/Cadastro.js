import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import assegurarExistencia, { incluirDados, resgatarDados, deletarTodosDados, apagarDiretorio } from '../components/dados_teste'
import * as FileSystem from 'expo-file-system/legacy'
import resgatarIDS, { gerarID } from '../components/IDs_functions'

export default function Cadastro({verificarTela}) {

    const dirPathUsuarios = `${FileSystem.documentDirectory}data/`
    const pathUsuarios = `${dirPathUsuarios}usuarios.json`


    const [mensagem, setMensagem] = useState('')
    const [username, setUsername] = useState('')
    const [telefone, setTelefone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const cadastrarUsuario = async () => {

        await assegurarExistencia(dirPathUsuarios)

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


        const DADOS_EXISTENTES = await resgatarDados(dirPathUsuarios, pathUsuarios)
        

        for(let i in DADOS_EXISTENTES){

          if(DADOS_EXISTENTES[i].telefone == telefoneLimpo){
            setMensagem('O telefone que você está tentando cadastrar já existe em nossa base de dados, tente novamente com outro número')

            setTimeout(() => {
              setMensagem('')
            }, 4000);

            return
          }
        }

        const ID = await gerarID(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/ids_cad.json`)


        const objeto = {
            username: username,
            password: password,
            telefone: telefoneLimpo,
            id: ID
        }



        const resposta = await incluirDados(dirPathUsuarios, pathUsuarios, objeto)
        console.log(resposta)

        setMensagem('Cadastro concluído com sucesso, você já pode retornar à tela de login')

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


      <TouchableOpacity style={styles.btnCancel} onPress={() => verificarTela('login')}>
        <Text style={styles.textBtnCancel}>
            Voltar para login
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