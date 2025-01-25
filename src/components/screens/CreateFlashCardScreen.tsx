import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { colors, typography, shadows } from "../../styles/theme"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'CreateFlashcard'>;
};

const CreateFlashcardScreen = ({ navigation }: Props) => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSave = () => {
    // Save flashcard logic here
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Create Flashcard</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={setQuestion}
            placeholder="Enter your question"
            placeholderTextColor={colors.textLight}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={setAnswer}
            placeholder="Enter the answer"
            placeholderTextColor={colors.textLight}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Flashcard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    ...typography.header,
    color: colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    color: colors.text,
    ...shadows.small,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    ...shadows.small,
  },
  saveButtonText: {
    color: colors.background,
    ...typography.subheader,
  },
})

export default CreateFlashcardScreen

