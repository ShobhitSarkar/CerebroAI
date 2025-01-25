import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { colors, typography, shadows } from '../../styles/theme'

type Props = {
  question: string;
  answer: string;
}

const FlashCard = ({ question, answer }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const flipAnimation = useRef(new Animated.Value(0)).current

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 180
    Animated.spring(flipAnimation, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start()
    setIsFlipped(!isFlipped)
  }

  const frontAnimatedStyle = {
    transform: [{
      rotateX: flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      }),
    }],
  }

  const backAnimatedStyle = {
    transform: [{
      rotateX: flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
      }),
    }],
  }

  return (
    <TouchableOpacity onPress={handleFlip} activeOpacity={0.9} style={styles.container}>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <Text style={styles.text}>{question}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <Text style={styles.text}>{answer}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
})

export default FlashCard