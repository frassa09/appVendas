import * as FileSystem from 'expo-file-system/legacy'


export default async function assegurarExistencia(dirPath) {
    
    try{
        const info = await FileSystem.getInfoAsync(dirPath)

        if(!info.exists){
            await FileSystem.makeDirectoryAsync(dirPath, {intermediates: true})
        }

        console.log('Diretório criado com sucesso ou já existe')
    }
    catch(e){
        console.log('Ocorreu algum erro ao comunicar com diretório: ' + e )
    }
}


export async function incluirDados(dirPath, path, data){


    const DADOS_EXISTENTES = await resgatarDados(dirPath, path)

    console.log("Dados a serem guardados: " + JSON.stringify(data))

    DADOS_EXISTENTES.push(data)

    try{

        await FileSystem.writeAsStringAsync(path, JSON.stringify(DADOS_EXISTENTES))

        const DADOS_ATUAIS = await FileSystem.readAsStringAsync(path)

        console.log(`Dados atuais: ${JSON.stringify(DADOS_ATUAIS)}`)

        return 'Dados registrados com sucesso'
    }
    catch(e){
        console.log(`Erro ao incluir dados em: ${e}`)
    }

}

export async function resgatarDados(dirPath, path){


    await assegurarExistencia(dirPath)
    
    try{
        const dataJSON = await FileSystem.readAsStringAsync(path)

        if(dataJSON){
            const data = JSON.parse(dataJSON)

            console.log(`Dados resgatados: ${JSON.stringify(data)}`)

            return data
        }
        else{
            console.log('Nenhum dado encontrado, retornando array')
            return []
        }
    }
    catch(e){
        console.log(`Erro ao resgatar dados em: ${e}`)
        return []
    }
}

export async function deletarTodosDados(dirPath, path) {

    await apagarDiretorio(path)

    await assegurarExistencia(dirPath)

    try{
        await FileSystem.writeAsStringAsync(path, JSON.stringify([]))

        const dados = await FileSystem.readAsStringAsync(path)

        console.log(`Dados deletados. Dados atuais: ${JSON.parse(dados)}`)

    }
    catch(e){
        console.log(`Erro ocorreu ao deletar dados: ${e}`)
    }
    
}

export async function apagarDiretorio(caminhoDiretorio) {
  try {
    await FileSystem.deleteAsync(caminhoDiretorio);
    console.log(`Diretório '${caminhoDiretorio}' apagado com sucesso!`);
  } catch (error) {
    console.error(`Erro ao apagar o diretório '${caminhoDiretorio}':`, error);
  }
}