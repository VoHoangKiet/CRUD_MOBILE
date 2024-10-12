import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface IUser {
  id: number
  firstName: string
  class: string
}

export default function CrudStuddent() {

  const navigator = useNavigation();
  const list = [
    { id: 1, firstName: "kiet", class: "A1" },
    { id: 2, firstName: "kiet2", class: "A2" },
    { id: 3, firstName: "kiet3", class: "A3" },
    { id: 4, firstName: "kiet4", class: "A4" },
  ];
  const [student, setStudents] = useState<IUser>();
  const [listStudent, setListStudent] = useState<IUser[]>(list);
  const [modalVisible, setModalVisible] = useState(false);
  
  function randomInteger() {
    return Math.floor(Math.random() * (100000-1+1)) + 1;
  }
  const handleFirstNameChange = (name: string) => {
    setStudents({ ...student, firstName: name } as IUser);
  };
  
  const handleClassChange = (studentClass: string) => {
    setStudents({ ...student, class: studentClass } as IUser);
  };

  const addNewStudent = () => {
    if (!student) {
      setModalVisible(!modalVisible);
      alert("No data require !");
      return;
    }
    setListStudent([...listStudent ,{id: randomInteger(), firstName: student.firstName, class: student.class}]);
    setModalVisible(!modalVisible);
  }

  const deleteStudent = (idDel: number) => {
  setListStudent(listStudent.filter(student => student.id !== idDel)); 
  }
  
  const updateStudent = () => {
    navigator.navigate<never>("Update" as never);
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.containerFlatList}
        data={listStudent}
        keyExtractor={item => "" + item.id}
        renderItem={(data) => {
          return (
            <View>
              <Text style={styles.text}>Name: {data.item.firstName} - Class: {data.item.class}</Text>
              <Button title="update" color={"green"} onPress={() => updateStudent()}/>
              <Button title="delete" color={"red"} onPress={() => deleteStudent(data.item.id)}/>
            </View>
          );
        }}
      />
      <Button title="Add new" onPress={() => setModalVisible(!modalVisible)}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Add New Student
            </Text>
            <TextInput style={styles.inputText} placeholder="Student Name" onChangeText={handleFirstNameChange}/>
            <TextInput style={styles.inputText} placeholder="Student class" onChangeText={handleClassChange}/>
            <View style={styles.bothButton}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose, { marginLeft: 10 }]}
              onPress={addNewStudent}>
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  containerFlatList: {
    flexGrow: 1, 
    justifyContent: 'center',
  },
  text : {
    fontSize: 30,
    backgroundColor: "pink",
    borderWidth: 1,
    padding: 30,
    display: "flex",
    alignItems: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputText: {
    borderColor: "green",
    borderWidth: 1,
    width: 200,
    padding: 5,
    marginBottom: 15
  },
  bothButton: {
    flexDirection: "row",
  }
});
