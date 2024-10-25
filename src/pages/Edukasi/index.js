import { View, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyCarouser, MyGap, MyHeader } from '../../components'
import { Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'

export default function Edukasi({ navigation }) {


    const [data, setData] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            axios.post(apiURL + 'edukasi').then(res => {
                console.log(res.data);
                setData(res.data);
            })
        }
    }, [isFocused])
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <View>
                <MyHeader onPress={() => navigation.goBack()} title="Edukasi" />
            </View>



            <ScrollView>

                <View style={{
                    padding: 20
                }}>

                    {/* poster */}
                    <View>
                        <View>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 18,
                                marginBottom: 10,
                            }}>Poster</Text>

                            {/* MUNCUL POSTER */}
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>

                                <FlatList horizontal data={data.filter(i => i.judul == 'POSTER')} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate('EdukasiDetail', item)}>
                                            <View>
                                                <Image style={{
                                                    width: 163,
                                                    height: 231,
                                                    marginRight: 10
                                                }} source={{
                                                    uri: item.image
                                                }} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }} />

                            </View>
                        </View>
                    </View>
                    <MyGap jarak={50} />

                    {/* tips */}
                    <View>
                        <View>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 18,
                                marginBottom: 10,

                            }}>Tips</Text>

                            {/* MUNCUL POSTER */}
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>


                                <FlatList horizontal data={data.filter(i => i.judul == 'TIPS')} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate('EdukasiDetail', item)}>
                                            <View>
                                                <Image style={{
                                                    width: 163,
                                                    height: 231,
                                                    marginRight: 10
                                                }} source={{
                                                    uri: item.image
                                                }} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }} />



                            </View>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </View>
    )
}