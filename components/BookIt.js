import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import TimeInput from '@tighten/react-native-time-input';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import { buildingName } from './Home'

const BookIt = ({ route, navigation }) => {
  const data1 = route.params

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' }
  ]);
  console.log(value)
  const [SubName, setSubName] = useState('');
  const [sec, setsec] = useState('');
  const [corsins, setcorsins] = useState('');
  const [startHour, setstartHour] = useState('');
  const [startMin, setstartMin] = useState('');
  const [endHour, setendHour] = useState('');
  const [endMin, setendMin] = useState('');

  const createClass = async () => {
    var sttime = startHour + ":" + startMin
    var entime = endHour + ":" + endMin
    if (SubName && sec && corsins && value) {
      await fetch(`http://10.0.2.2:5000/api/addSlot`, {
        method: "POST",
        body: JSON.stringify({
          "building_name": data1.building,
          "class_name": data1.room,
          "course": SubName,
          "section": sec,
          "teacher_name": corsins,
          "st_time": sttime,
          "end_time": entime,
          "day": value,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status == 1) {
            navigation.navigate('Drawer');
            alert(response.msg)
          } else {
            alert(response.msg)

          }
        })
    } else {
      console.log('fil all fields')
    }

  };

  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: '5%'
            }}>
            CLASS DETAILS
          </Text>
          <View>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.box_text}>{data1.room}</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholderTextColor={'maroon'}
            placeholder="SUBJECT NAME"
            style={styles.input}
            value={SubName}
            onChangeText={(e) => {
              setSubName(e)
            }}
          />
          <TextInput
            placeholderTextColor={'maroon'}
            placeholder="SECTION"
            style={styles.input}
            value={sec}
            onChangeText={(e) => {
              setsec(e)
            }}

          />
          <TextInput
            placeholderTextColor={'maroon'}
            placeholder="COURSE INSTRUCTOR"
            style={styles.input}

            value={corsins}
            onChangeText={(e) => {
              setcorsins(e)
            }}
          />
          <View>

          </View>
          <View>
            <Text style={{
              color: 'black', marginTop: '5%',
            }}>Time should be in 24 hour format</Text>
          </View>
          <View style={styles.timeStyle}>
            <View style={{ marginHorizontal: '1%' }} >
              <Text style={{ color: 'green' }}>Start time </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  onChangeText={e => setstartHour(e)}
                  value={startHour}
                  placeholder="Hour"
                />
                <Text style={{ marginBottom: "5%" }}>:</Text>
                <TextInput
                  onChangeText={e => setstartMin(e)}
                  value={startMin}
                  placeholder="Min"
                />
              </View>
            </View>
            <View style={{ marginHorizontal: '1%', }}>
              <Text style={{ color: 'green' }}>End Time </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  onChangeText={e => setendHour(e)}
                  value={endHour}
                  placeholder="Hour"
                  keyboardType="numeric"
                />
                <Text style={{ marginBottom: "5%" }}>:</Text>
                <TextInput
                  onChangeText={e => setendMin(e)}
                  value={endMin}
                  placeholder="Min"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>


          <View
            style={{
              width: '70%',
              marginTop: "5%",
            }}
          >

            <DropDownPicker style={{ width: '100%', borderColor: "maroon", borderWidth: 2 }}
            translation={{
              PLACEHOLDER: "Select a day"
            }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />

          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: "20%"
          }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              createClass()
            }>
            <Icon name="check-circle" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {

            }}>
            <Icon name="home" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'maroon' }}>
            Allright Reserved to Smiu.edu.pk
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    backgroundColor: 'gainsboro',
    width: 350,
    marginTop: 10,
    borderRadius: 5,
    padding: 20,
    height: 70,
    color: 'maroon',
  },
  container: {
    alignItems: 'center',
  },
  myLogo: {
    height: 220,
    width: 220,
  },
  btn: {
    width: 150,
    height: 40,
    backgroundColor: 'maroon',
    marginTop: 20,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  mytext: {
    color: 'white',
  },
  box_text: {
    color: 'black',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 15,
  },
  box: {
    height: 85,
    width: 85,
    backgroundColor: 'gainsboro',
    marginHorizontal: 8,
    marginVertical: 14,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'green',
  },
  boxStyle: {
    marginTop: '5%',
    alignItems: 'center',

  },
  checkbo: {
    backgroundColor: "gainsboro",

  },
  timeStyle: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: "80%",
    marginTop: '2%'

  }
});
export default BookIt;
