import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { colors, fonts } from '../../utils';
import { storeData, getData, api_token, pasien, apiURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import MyLoading from '../../components/MyLoading';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';


export default function AddPasien({ navigation, route }) {
    const toast = useToast();
    const [kirim, setKirim] = useState({
        fid_pengguna: route.params.id_pengguna,
        nama_pasien: '',
        jenis_kelamin: 'Laki-laki',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        alamat: '',
        diagnosis: '',
    });

    const sendData = () => {
        console.log(kirim);
        axios.post(apiURL + 'add_pasien', kirim).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                toast.show(res.data.message, {
                    type: 'success'
                });
                navigation.goBack();
            }
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Tambah Identitas Pasien" />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <MyInput
                        value={kirim.nama_pasien}
                        onChangeText={(value) => setKirim({ ...kirim, nama_pasien: value })}
                        label="Nama Lengkap Pasien"
                        placeholder="Isi Nama Lengkap"
                    />
                    <MyGap jarak={10} />

                    <MyPicker
                        data={[
                            { label: 'Perempuan', value: 'Perempuan' },
                            { label: 'Laki-laki', value: 'Laki-laki' }
                        ]}
                        label="Jenis Kelamin"
                        placeholder="Pilih Jenis Kelamin"
                        value={kirim.jenis_kelamin}
                        onValueChange={(value) => setKirim({ ...kirim, jenis_kelamin: value })}
                    />
                    <MyGap jarak={10} />

                    <MyCalendar
                        label="Tanggal Lahir (Opsional)"
                        placeholder="Pilih Tanggal"
                        onDateChange={x => setKirim({ ...kirim, tanggal_lahir: x })}
                        value={kirim.tanggal_lahir}
                    />
                    <MyGap jarak={10} />

                    <MyInput
                        value={kirim.alamat_lengkap}
                        onChangeText={(value) => setKirim({ ...kirim, alamat: value })}
                        label="Alamat Lengkap"
                        placeholder="Isi Alamat Lengkap"
                    />
                    <MyGap jarak={10} />

                    <MyInput
                        value={kirim.diagnosis}
                        onChangeText={(value) => setKirim({ ...kirim, diagnosis: value })}
                        label="Diagnosis Medis"
                        placeholder="Isi Diagnosis Medis"
                    />
                    <MyGap jarak={20} />
                    <MyButton title="Simpan" onPress={sendData} />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})