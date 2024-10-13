import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createStudent, deleteById, getAll } from "../service/StudentService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IUser } from "../interface/IUser";
type RootStackParamList = {
  Home: undefined;
  UpdateStudent: { studentId: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function CrudStuddent() {
  const navigator = useNavigation<HomeScreenNavigationProp>();
  const [student, setStudents] = useState<IUser>({
    id: randomInteger().toString(),
    firstName: "",
    class: "",
  });
  const [listStudent, setListStudent] = useState<IUser[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const fetchListStudent = useCallback( async () => {
    try {
      const response = await getAll();
      setListStudent(response);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  },[])

  useFocusEffect(
    useCallback(() => {
      fetchListStudent();
    }, [])
  );

  function randomInteger() {
    return Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
  }
  const handleFirstNameChange = (name: string) => {
    setStudents({ ...student, firstName: name } as IUser);
  };

  const handleClassChange = (studentClass: string) => {
    setStudents({ ...student, class: studentClass } as IUser);
  };

  const addNewStudent = async () => {
    if (!student) {
      setModalVisible(!modalVisible);
      alert("No data require !");
      return;
    }
    await createStudent(student);
    setListStudent(prevList => [...prevList, student]);
    setModalVisible(!modalVisible);
  };

  const deleteStudent = async (idDel: string) => {
    try {
      if (listStudent) {
        alert("Delete Succesfully")
        await deleteById(idDel);
        setListStudent(listStudent.filter((student) => student.id !== idDel));
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const updateStudent = (idUpdate: string) => {
    navigator.navigate('UpdateStudent', {
      studentId: idUpdate
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.containerFlatList}
        data={listStudent}
        keyExtractor={(item) => "" + item.id}
        renderItem={(data) => {
          return (
            <View>
              <Text style={styles.text}>
                Name: {data.item.firstName} - Class: {data.item.class}
              </Text>
              <Button
                title="update"
                color={"green"}
                onPress={() => updateStudent(data.item.id)}
              />
              <Button
                title="delete"
                color={"red"}
                onPress={() => deleteStudent(data.item.id)}
              />
            </View>
          );
        }}
      />
      <Button title="Add new" onPress={() => setModalVisible(!modalVisible)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Student</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Student Name"
              onChangeText={handleFirstNameChange}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Student class"
              onChangeText={handleClassChange}
            />
            <View style={styles.bothButton}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { marginLeft: 10 }]}
                onPress={addNewStudent}
              >
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
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    backgroundColor: "pink",
    borderWidth: 1,
    padding: 30,
    display: "flex",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputText: {
    borderColor: "green",
    borderWidth: 1,
    width: 200,
    padding: 5,
    marginBottom: 15,
  },
  bothButton: {
    flexDirection: "row",
  },
});
