import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

export default function Inicial({verificarTela}) {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.botaoMatriz} onPress={() => verificarTela('matriz')}>
                <Text>
                  Matriz 
                </Text>
        </TouchableOpacity>



    <View>
      <Text>Inicial</Text>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    botaoMatriz: {
        backgroundColor: '#d6b58c',
        borderRadius: 10,
        width: 50,
        alignItems: 'center'
    }
})