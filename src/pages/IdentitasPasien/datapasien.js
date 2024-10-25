import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { useIsFocused } from '@react-navigation/native';
import { MyButton, MyHeader } from '../../components';
import { TouchableOpacity } from 'react-native';
import { fonts, colors, Color } from '../../utils';
import moment from 'moment';

export default function datapasien({ navigation, route }) {

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const __getData = () => {

    getData('user').then(u => {
      setUser(u);
      axios.post(apiURL + 'pasien', {
        fid_pengguna: u.id_pengguna
      }).then(res => {
        console.log(res.data);
        setData(res.data)
      })
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
      <MyHeader onPress={() => navigation.goBack()} title="Identitas Pasien" />
      <View style={{
        padding: 16,
        flex: 1,
      }}>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={{
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

            </TouchableOpacity>
          )
        }} />
      </View>
      <View style={{
        padding: 10,
      }}>
        <MyButton title="Tambah" onPress={() => navigation.navigate('AddPasien', user)} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})