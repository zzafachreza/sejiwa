import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { useIsFocused } from '@react-navigation/native';
import { MyButton, MyGap, MyHeader } from '../../components';
import { TouchableOpacity } from 'react-native';
import { fonts, colors, Color } from '../../utils';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';


export default function InfoPasien({ route, navigation }) {
  // Mengambil data pasien dari parameter navigasi
  const toast = useToast();
  const item = route.params;
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
    <View style={{
      flex: 1,
      backgroundColor: Color.blueGray[100],
    }}>
      {/* Header */}

      <MyHeader title="Data Pasien" />


      <View style={{
        margin: 20,
        marginVertical: 8,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
      }}>
        <Thelist label="Nama Lengkap Pasien" value={item.nama_pasien} />
        <Thelist label="Jenis Kelamin" value={item.jenis_kelamin} />
        <Thelist label="Tanggal Lahir" value={moment(item.tanggal_lahir).format('DD MMMM YYYY')} />
        <Thelist label="Alamat Lengkap" value={item.alamat} />
        <Thelist label="Diagnosis" value={item.diagnosis} />


      </View>
      <View style={{
        padding: 20
      }}>
        <MyButton title="Rekaman / Data Saat Ini" onPress={() => navigation.navigate('HomeRekamanData', item)} />
        <MyGap jarak={20} />
        <MyButton warna={colors.tertiary} colorText={colors.primary} title="Edit Data Pasien" onPress={() => navigation.navigate('EditPasien', item)} />
        <MyGap jarak={20} />
        <MyButton warna={colors.danger} title="Hapus" onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
          { text: 'TIDAK' },
          {
            text: 'Ya',
            onPress: () => {
              axios.post(apiURL + 'delete_pasien', {
                id_pasien: item.id_pasien
              }).then(res => {
                console.log(res.data)
                if (res.data.status == 200) {
                  toast.show(res.data.message, { type: 'success' });
                  navigation.goBack();
                }
              })
            }

          }
        ])} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    padding: 10,


  },
  label: {
    fontFamily: fonts.primary[600],
    fontSize: 15,
    color: colors.primary,
  },
  value: {
    fontFamily: fonts.primary[600],
    fontSize: 15,
    color: colors.primary,
  },
});
