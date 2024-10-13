import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CrudStuddent from "./components/CrudStudent";
import UpdateStudent from "./components/UpdateStudent";
import Hello from "./components/Hello";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={CrudStuddent}
          options={{title: 'CRUD STUDENT'}}
        />
        <Stack.Screen name="UpdateStudent" component={UpdateStudent} />
        <Stack.Screen name="Hello" component={Hello} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

