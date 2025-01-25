import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/styles/theme';
import HomeScreen from '@/components/screens/HomeScreen';
import CreateFlashcardScreen from '@/components/screens/CreateFlashCardScreen';

export type RootStackParamList = {
  Home: undefined;
  CreateFlashcard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateFlashcard" component={CreateFlashcardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;