import * as FileSystem from 'expo-file-system/legacy'
import assegurarExistencia from './dados_teste'
import { deletarTodosDados } from './dados_teste'



export default async function resgatarIDS(dirPath, path){


    await assegurarExistencia(dirPath)

    try{

        const IDS_INFO = await FileSystem.getInfoAsync(path)

        if(!IDS_INFO.exists){
            console.log(`IDs inexistentes. Retornando array`)
            return JSON.stringify([])
        }

        const IDS_EXISTENTES = await FileSystem.readAsStringAsync(path)

        console.log(`IDs existentes: ${IDS_EXISTENTES}`)

        return IDS_EXISTENTES

    }
    catch(e){
        return console.log(`Erro ao resgatar IDS: ${e}`)
    }

}

export async function gerarID(){

    const dirPath = `${FileSystem.documentDirectory}/data/`
    const path = `${dirPath}ids_cad.json`

    let ID_GERADO = Math.floor(Math.random() * 1000000)

    const IDS_EXISTENTES_JSON = await resgatarIDS(dirPath, path)

    const IDS_EXISTENTES = JSON.parse(IDS_EXISTENTES_JSON)

    IDS_EXISTENTES.map((id) => {

        if(id == ID_GERADO){
            while(id == ID_GERADO){
                ID_GERADO = Math.floor(Math.random() * 1000000)
            }
        }
    })

    IDS_EXISTENTES.push(ID_GERADO)

    await FileSystem.writeAsStringAsync(path, JSON.stringify(IDS_EXISTENTES))
    
    return ID_GERADO
}