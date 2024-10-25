import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from 'react-native-elements'
import { Image } from 'react-native'
import { windowHeight, windowWidth } from '../../utils'

export default function EdukasiDetail({ navigation, route }) {
    const item = route.params;
    console.log(item)
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10
        }}>
            <Image style={{
                width: windowWidth - 20,
                height: windowHeight,
                resizeMode: 'contain'
            }} source={{
                uri: item.image
            }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})