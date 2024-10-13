import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { getById, updateStudentById } from "../service/StudentService";
import { IUser } from "../interface/IUser";
import { Formik } from "formik";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  UpdateStudent: { studentId: string };
  Home: undefined
};

type UpdateStudentRouteProp = RouteProp<RootStackParamList, "UpdateStudent">;
type UpdateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdateStudent'>;

export default function UpdateStudent() {
  const route = useRoute<UpdateStudentRouteProp>();
  const navigator = useNavigation<UpdateScreenNavigationProp>();
  const { studentId } = route.params;
  const [student, setStudent] = useState<IUser>({
    id: "",
    firstName: "",
    class: "",
  });
  const fetchStudent = async () => {
    try {
      const response = await getById(studentId);
      setStudent(response as IUser);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };
  useEffect(() => {
    fetchStudent();
  }, []);


  const updateStudent = async (studentUpdate: IUser) => {
    await updateStudentById(studentUpdate,studentId);
    navigator.navigate("Home");
  }
  return (
    <View>
      <Formik
        enableReinitialize={true}
        initialValues={student}
        onSubmit={(values) => updateStudent(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.inputText}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            <TextInput
              style={styles.inputText}
              onChangeText={handleChange("class")}
              onBlur={handleBlur("class")}
              value={values.class}
            />
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  inputText: {
    borderColor: "green",
    fontSize: 30,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
});
