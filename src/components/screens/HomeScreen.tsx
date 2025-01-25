import React from "react"
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native"
import { colors, typography, shadows } from "../../styles/theme"
import BottomNavigation from "../../components/common/BottomNavigation"
import FlashCard from "../../components/common/FlashCard"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

const flashcards = [
  { id: "1", question: "What is the capital of France?", answer: "Paris" },
  { id: "2", question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
  { id: "3", question: "What is the chemical symbol for gold?", answer: "Au" },
]

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: Props) => {
  const renderItem = ({ item }) => (
    <FlashCard
      question={item.question}
      answer={item.answer}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>CerebroAI</Text>
      </View>
      <FlatList
        data={flashcards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  header: {
    ...typography.header,
    color: colors.primary,
    textAlign: "left",
  },
  listContainer: {
    padding: 20,
    paddingBottom: 80,
  }
})

export default HomeScreen