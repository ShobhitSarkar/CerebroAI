import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { colors, shadows } from "../../styles/theme"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const BottomNavigation = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Feather name="home" size={24} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("CreateFlashcard")}>
        <Feather name="plus-square" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingVertical: 10,
    ...shadows.medium,
  },
})

export default BottomNavigation