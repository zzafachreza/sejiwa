import { View, Text, ScrollView, TouchableNativeFeedback, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyTimePicker } from '../../components'
import { useState } from 'react';
import { Value } from 'react-native-reanimated';

export default function HasilTekananDarah({navigation}) {
  
  const handleFileChange = (file) => {
    // Tangani file yang dipilih di sini
    console.log('File yang dipilih:', file);
  };

// State untuk mengatur tampilan
const [isInputMode, setIsInputMode] = useState(false);
const [gulaValue, setGulaValue] = useState('');

const handleAddPress = () => {
// Mengubah tampilan menjadi mode input
setIsInputMode(true);
};

const handleSavePress = () => {
// Di sini Anda dapat menambahkan logika untuk menyimpan data gula
console.log('Nilai Gula:', gulaValue);

// Kembali ke tampilan awal setelah menyimpan data
setIsInputMode(false);
};

const handleBackPress = () => {
// Kembali ke tampilan awal dalam mode yang sama
setIsInputMode(false);
};    
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
      <MyHeader title="Hasil Tekanan Darah"/>

      {isInputMode ? (
        // Tampilan untuk input gula
        <View>
        <ScrollView>
          <View style={{ padding: 20 }}>

           <MyInput label="Tekanan Darah Sistolik" rightLabel="mmHg" placeholder="Isi disini"/>

           <MyGap jarak={10}/>

           <MyInput label="Tekanan Darah Diastolik" rightLabel="mmHg" placeholder="Isi disini"/>

          <MyGap jarak={10}/>

         <MyCalendar label="Tanggal"/>

          <MyGap jarak={10}/>

          <MyTimePicker label="Waktu"/>
          </View>
        </ScrollView>
        <View style={{
            padding:20
        }}>
            <MyButton title="Simpan"/>
                <MyGap jarak={20}/>
            <TouchableWithoutFeedback onPress={handleBackPress}>
                <View style={{
                    padding:10,
                    borderWidth:1,
                    borderRadius:10,
                    borderColor:colors.danger
                }}>
                    <Text style={{
                        fontFamily:fonts.primary[500],
                        textAlign:'center',
                        color:colors.danger
                    }}>Kembali</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
        </View>
        
      ) : (
        // Tampilan awal dengan tombol Add
        <>
          <ScrollView>
            <View style={{ padding: 20 }}>
              {/* Konten lainnya di sini */}
            </View>
          </ScrollView>
          <View style={{ padding: 10 }}>
            <TouchableNativeFeedback onPress={handleAddPress}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Image
                  style={{ width: 68, height: 68 }}
                  source={require('../../assets/add.png')}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </>
      )}
    </View>
  )
}