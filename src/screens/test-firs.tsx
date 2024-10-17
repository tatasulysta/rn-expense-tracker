import { useQuery, useRealm } from "@realm/react";
import React, { useRef } from "react";
import { Task } from "../store/schema";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TEstFirst() {
  const descriptionRef = useRef("");

  const realm = useRealm();

  const tasks = useQuery(Task);
  const createNewTask = () => {
    realm.write(() => {
      const newTask = new Task(realm, descriptionRef.current);

      // clear input field
      descriptionRef.current = "";

      // return task
      return newTask;
    });
  };
  return (
    <View style={{ height: Dimensions.get("screen").height - 132 }}>
      <Text>TASK LIST</Text>
      {/* input for description */}
      <TextInput
        placeholder="Enter New Task"
        autoCapitalize="none"
        nativeID="description"
        multiline={true}
        numberOfLines={8}
        value={descriptionRef.current}
        onChangeText={(text) => {
          descriptionRef.current = text;
        }}
      />
      {/*  button to save the new task */}
      <TouchableOpacity
        onPress={() => {
          createNewTask();
        }}
      >
        <Text>SAVE TASK</Text>
      </TouchableOpacity>
      <Text>{JSON.stringify(tasks, null, 2)}</Text>
    </View>
  );
}
