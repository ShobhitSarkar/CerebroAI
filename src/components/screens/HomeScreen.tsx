import React, { useRef, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { colors, typography } from "../../styles/theme"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7

interface Flashcard {
  id: string
  question: string
  answer: string
}

const dummyFlashcards: Flashcard[] = [
  { id: "1", question: "What is the capital of France?", answer: "Paris" },
  { id: "2", question: 'Who wrote "Romeo and Juliet"?', answer: "William Shakespeare" },
  { id: "3", question: "What is the chemical symbol for gold?", answer: "Au" },
  { id: "4", question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { id: "5", question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
]

const FlashcardItem = React.memo(({ item, index }: { item: Flashcard; index: number }) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const flipAnim = useRef(new Animated.Value(0)).current

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  })

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  })

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 0],
  })

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 0, 1],
  })

  const flipCard = () => {
    const toValue = showAnswer ? 0 : 180
    Animated.spring(flipAnim, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start()
    setShowAnswer(!showAnswer)
  }

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.cardWrapper}>
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            {
              opacity: frontOpacity,
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Question</Text>
            <Text style={styles.cardText}>{item.question}</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              opacity: backOpacity,
              transform: [{ rotateY: backInterpolate }],
            },
          ]}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardLabel, { color: colors.secondary }]}>Answer</Text>
            <Text style={styles.cardText}>{item.answer}</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
})

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CerebroAI</Text>
      </View>

      <FlatList
        data={dummyFlashcards}
        renderItem={({ item, index }) => <FlashcardItem item={item} index={index} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={CARD_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.feedbackContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.feedbackButton}>
              <Feather name="thumbs-down" size={24} color={colors.error} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.feedbackButton}>
              <Feather name="thumbs-up" size={24} color={colors.secondary} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  logo: {
    ...typography.header,
    color: colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  cardWrapper: {
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  card: {
    position: "absolute",
    width: SCREEN_WIDTH - 40,
    height: CARD_HEIGHT - 20,
    backgroundColor: colors.surface,
    borderRadius: 20,
    backfaceVisibility: "hidden",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardFront: {
    borderColor: `${colors.primary}40`,
  },
  cardBack: {
    borderColor: `${colors.secondary}40`,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardLabel: {
    ...typography.subheader,
    color: colors.primary,
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  cardText: {
    ...typography.header,
    color: colors.text,
    textAlign: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  feedbackContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  feedbackButton: {
    padding: 15,
    backgroundColor: colors.surface,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
})

