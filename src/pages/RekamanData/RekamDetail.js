import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Color, colors, fonts } from '../../utils';
import { storeData, getData, api_token, pasien, apiURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import MyLoading from '../../components/MyLoading';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';


export default function RekamDetail({ navigation, route }) {
    const toast = useToast();
    const item = route.params;
    console.log('detai', item)


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
            backgroundColor: colors.white
        }}>
            <MyHeader title="Rekaman / Data Saat Ini" />
            <View style={{
                flex: 1,
                marginVertical: 8,
                backgroundColor: colors.white,
                borderRadius: 10,
                padding: 10,

            }}>


                <Text style={{
                    ...fonts.subheadline3,
                    textAlign: 'center',
                    color: colors.primary,
                }}>Hasil Rekaman / Data Saat Ini :</Text>


                <Thelist label="1. Gejala Psikotik yang muncul" value={item.a1} />
                <Thelist label="2. Kepatuhan Minum Obat" value={item.a2} />
                <Thelist label="3. Pernah Rawat Inap?" value={item.a3 == 'Ya' ? `${item.a3} ( ${moment(item.tanggal_rawatinap).format('DD MMMM YYYY')} )` : item.a3} />
                <Thelist label="4. Aktivitas sehari-hari" value={item.a4} />
                <Thelist label="5. Pola Makan" value={item.a5} />

                <Text style={{
                    ...fonts.headline1,
                    textAlign: 'center',
                    color: colors.primary,
                    marginBottom: 10,
                }}>{item.hasil}</Text>
                <Image
                    source={item.hasil === 'Terkontrol' ? require('../../assets/icon_done.png') : require('../../assets/not_done.png')}
                    style={{ width: 200, height: 200, alignSelf: 'center', marginTop: '10%' }}
                />

                <Text style={{
                    marginTop: 20,
                    ...fonts.subheadline3,
                    textAlign: 'center',
                    color: Color.blueGray[400]
                }}>{moment(item.tanggal_lahir).format('DD MMMM YYYY')}</Text>



            </View>
            <View style={{ padding: 20 }}>

                <MyButton title="Selesai" onPress={() => navigation.pop(2)} />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})