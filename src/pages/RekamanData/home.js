import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { useIsFocused } from '@react-navigation/native';
import { MyButton, MyHeader } from '../../components';
import { TouchableOpacity } from 'react-native';
import { fonts, colors, Color } from '../../utils';
import moment from 'moment';

export default function HomeRekamanData({ navigation, route }) {
    console.log(route.params.id_pasien)
    const ITEM = route.params;
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const __getData = () => {

        axios.post(apiURL + 'rekam', {
            fid_pasien: route.params.id_pasien
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const isFocused = useIsFocused();
    useEffect(() => {

        if (isFocused) {
            __getData();
        }

    }, [isFocused]);

    const Thelist = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    flex: 0.5,
                    ...fonts.caption1,
                    color: colors.primary,
                }}>{label}</Text>
                <Text style={{
                    flex: 0.05,
                    ...fonts.caption1,
                    color: colors.primary,
                }}>:</Text>
                <Text style={{
                    flex: 0.4,
                    ...fonts.caption1,
                    color: colors.primary,
                }}>{value}</Text>
            </View >
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Color.blueGray[100]
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Rekaman / Data Saat Ini" />
            <View style={{
                padding: 16,
                flex: 1,
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('InfoPasien', item)} style={{
                            marginVertical: 8,
                            backgroundColor: colors.white,
                            borderRadius: 10,
                            padding: 10,

                        }}>


                            <Text style={{
                                ...fonts.body3,
                                textAlign: 'center',
                                color: colors.primary,
                            }}>Hasil Rekaman / Data Saat Ini :</Text>
                            <Text style={{
                                ...fonts.headline4,
                                textAlign: 'center',
                                color: colors.primary,
                                marginBottom: 10,
                            }}>{item.hasil}</Text>
                            <Image
                                source={item.hasil === 'Terkontrol' ? require('../../assets/icon_done.png') : require('../../assets/not_done.png')}
                                style={{ width: 80, height: 80, alignSelf: 'center' }}
                            />

                            <Text style={{
                                ...fonts.caption,
                                textAlign: 'right',
                                color: Color.blueGray[400]
                            }}>{moment(item.tanggal_lahir).format('DD MMMM YYYY')}</Text>



                        </TouchableOpacity>
                    )
                }} />
            </View>
            <View style={{
                padding: 10,
            }}>
                <MyButton title="Tambah" onPress={() => navigation.navigate('RekamanData', ITEM)} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})