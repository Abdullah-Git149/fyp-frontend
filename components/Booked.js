import React, { useState, useEffect,useContext } from 'react';
import {
  View,
  Text,
  StyleSheet, 
  TextInput,
  TouchableOpacity,
   FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Spreadsheet from "react-spreadsheet";
import authContext from "../context/authContext"

const Booked = ({ navigation }) => {
  const {age} =  useContext(authContext); 
  console.log(age)
  const [listArr, setlistArr] = useState([])
    useEffect(() => {
    fetch(`http://10.0.2.2:5000/api/listOfSlots`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 1) {
          setlistArr(response.slots)
        } else {
          alert(response.msg)
        }
      })
  }, [])
  return (

    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>
          All Reserved Classes
        </Text>
        <TextInput
          placeholderTextColor={'maroon'}
          placeholder="Search By Section "
          style={styles.input}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={listArr}
            contentContainerStyle={{
              alignItems: "center",
            }}
            renderItem={({ item, index }) =>
              <View key={index} style={{ backgroundColor: "maroon", alignItems: "center", justifyContent: "center", marginVertical: 20, borderRadius: 10, paddingVertical: 5 }}>
                <View>
                  <View style={styles.bookedclasses}>
                    <View style={{ width: "60%" }}>
                      <Text style={{ color: 'black' }}>{item.course}</Text>
                    </View>
                    <View style={{ width: "30%" }}>
                      <Text style={{ color: 'black' }}>{item.section}</Text>
                    </View>
                  </View>
                  <View style={styles.bookedclasses}>
                    <View style={{ width: "60%" }}>
                      <Text style={{ color: 'black' }}>{item.teacher_name}</Text>
                    </View>
                    <View style={{ width: "30%" }}>
                      <Text style={{ color: 'black' }}>{item.day}</Text>
                    </View>
                  </View>
                  <View style={styles.bookedclasses}>
                    <View style={{ width: "60%" }}>
                      <Text style={{ color: 'black' }}>{item.st_time}</Text>
                    </View>
                    <View style={{ width: "30%" }}>
                      <Text style={{ color: 'black' }}>{item.end_time}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity style={styles.btn2} onPress={()=>{console.log(item._id)}}>
                    <Icon name="edit" size={30} color="maroon" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.btn2}
                    onPress={()=>{console.log(item._id)}}>
                    <Icon name="trash-o" size={30} color="maroon" />
                  </TouchableOpacity>
                </View>
              </View>
            } />
        </View> 
        <View
          style={{
            marginBottom: 30,
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.btn}>
            <Icon name="print" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Drawer');
            }}>
            <Icon name="home" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'maroon' }}>
          Allright Reserved to Smiu.edu.pk
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    paddingLeft: 20,
    fontSize: 17,
    backgroundColor: 'gainsboro',
    width: "90%",

    borderRadius: 5,
    color: 'maroon',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },

  btn: {
    width: 120,
    height: 40,
    backgroundColor: 'maroon',
    marginTop: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btn2: {
    width: 80,
    paddingVertical:5,
     backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  mytext: {
    color: 'white',
  },
  bookedclasses: {
    width: "95%",
    marginVertical: 5,
    flexDirection: "row",
    backgroundColor: 'gainsboro',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default Booked;
