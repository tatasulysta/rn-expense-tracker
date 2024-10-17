import { useQuery } from "@realm/react";
import React from "react";
import { Task } from "../store/schema";
import { Text, View } from "react-native";

export default function TestScreen() {
  const tasks = useQuery(Task);
  return (
    <View>
      <Text>TestScreen</Text>
      <Text>{JSON.stringify(tasks, null, 2)}</Text>
    </View>
  );
}
