import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedbackComponent, ScrollView } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { resgatarDados } from '../components/dados_teste'
import * as FileSystem from 'expo-file-system/legacy'

export default function Lojas({verificarTela, id}) {

    const idUsuario = id

    const dirPathUsuarios = `${FileSystem.documentDirectory}data/`
    const pathUsuarios = `${dirPathUsuarios}usuarios.json`

    const [dadosUsuario, setDadosUsuario] = useState(null)
    const [indexUsuario, setIndexUsuario] = useState(null)
    const [lojasExistem, setLojasExistem] = useState(false)
    const [lojas, setLojas] = useState(null)

    useEffect(() => {

        const carregarDados = async () => {
            try{
                const resposta = await resgatarDados(dirPathUsuarios, pathUsuarios)

                setDadosUsuario(resposta)
            }
            catch(e){
                console.log(`Erro ao regastar usuário: ${e}`)
            }
        }

        carregarDados()
        
        
        
    }, [])

    useEffect(() => {

        if(dadosUsuario){
            for(let usuario of dadosUsuario){
                if(usuario.id == idUsuario){
                    setIndexUsuario(dadosUsuario.indexOf(usuario))
                    console.log(dadosUsuario.indexOf(usuario))
                    break
                }
            }
        }
    }, [dadosUsuario])

    useEffect(() => {

        const resgatarLojas = async () => {

            try{

                const resposta = await resgatarDados(`${FileSystem.documentDirectory}data`, `${FileSystem.documentDirectory}data/lojas_usuarios.json`)

                setLojas(resposta)
                
            }
            catch(e){
                console.log(`Ocorreu algum erro ao carregar as lojas: ${e}`)
                return
            }
        }

        resgatarLojas()

    }, [])

    useEffect(() => {

        if(lojas){
        lojas.map((loja) => {

            if(loja.idUsuario == id){
                setLojasExistem(true)
                return
            }
        })
    }else{
        setLojasExistem(false)
    }

        console.log(lojasExistem)
    }, [lojas])


    if(!dadosUsuario || indexUsuario == undefined || indexUsuario == null){
        return(
            <Text>
                Carregando...
            </Text>
        )
    }

    
    

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.textOla}>
            Olá {dadosUsuario[indexUsuario].username}!
        </Text>
      <TouchableOpacity onPress={() => verificarTela('matriz')}>
        <Text>
            Matriz
        </Text>
      </TouchableOpacity>
    </View>

    <View style={styles.content}>

        <View style={lojasExistem ? styles.desativado : styles.sem_loja}>
        <Text style={styles.desc1}>
            Nenhum segmento de loja encontrado!
        </Text>
        <Text style={styles.desc2}>
        Parece que você ainda não adicionou nenhuma loja. Comece adicionando sua primeira loja para gerenciar seus negócios.
        </Text>

        <TouchableOpacity style={styles.btnAdicionarLoja} onPress={() => verificarTela('criar')}>
            <Text style={{color: 'white'}}>
                Adicionar Nova Loja
            </Text>
        </TouchableOpacity>
        </View>


        <ScrollView style={[lojasExistem ? styles.lojas : styles.desativado]}>
            
            {lojas.map((loja) => {

                if(loja.idUsuario == idUsuario){
                return(
                    <TouchableOpacity key={loja.idLoja} style={styles.botaoLoja}>
                        <Text style={styles.nomeLoja}>
                            {loja.nomeLoja}
                        </Text>
                        <Text style={styles.descLoja}>
                            {loja.descLoja}
                        </Text>
                        <Text style={styles.especialidade}>
                            Especialidade: {loja.especialidade}
                        </Text>
                        <Text>
                            Endereço: {loja.endereco}
                        </Text>
                    </TouchableOpacity>
                )
            }
            })}
        </ScrollView>
    </View>


    <View style={styles.barra_navegacao}>
          
          
          <TouchableOpacity style={styles.botoes_navegacao} onPress={() => verificarTela('criar')}>
            <Text>
              Criar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botoes_navegacao_selec} onPress={() => verificarTela('lojas')}>
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
        flex: 1
    },
    header: {
        flex: 1
    },
    content: {
        flex: 1,
        marginBottom: 180,
    },
    barra_navegacao: {
        flexDirection: 'row',
        gap: 100,
        justifyContent: 'center',
        borderTopColor: 'grey',
        borderTopWidth: 2,
        marginBottom: 15,
    },
    botoes_navegacao: {
        marginTop: 15,
        width: 60,
        alignItems: 'center',
        borderRadius: 8
    },
    botoes_navegacao_selec: {
        marginTop: 15,
        backgroundColor: '#d6d6d6',
        width: 60,
        alignItems: 'center',
        borderRadius: 8
    },
    desc1: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 250,
        fontSize: 20
    },
    desc2: {
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
        width: 270
    },
    btnAdicionarLoja: {
        backgroundColor: '#0078BD',
        alignItems: 'center',
        marginTop: 30,
        height: 50,
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 9
    },
    textOla: {
        fontSize: 25,
        margin: 10
    },
    desativado: {
        display: 'none'
    },
    botaoLoja: {
        borderWidth: 0.5,
        justifyContent: 'center',
        width: 350,
        alignSelf: 'center',
        borderRadius: 8,
        padding: 10,
        marginTop: 20
    },
    nomeLoja: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 8
    }
    
})