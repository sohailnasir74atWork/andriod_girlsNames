import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Code/HomeScreen';
import NamesByAlphabetsScreen from './Code/SearchByAlphabets';
import TrendingNamesScreen from './Code/TrendingNameScreen';
import SearchScreen from './Code/SearchScreen';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const headerStyle = {
    backgroundColor: '#800080', 
    height: 80,
  };

  const headerTitleStyle = {
    color: 'white', 
    fontSize: 19, 
  };
    return (

    <NavigationContainer>
      <StatusBar backgroundColor="#CF9FFF" barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home"  screenOptions={{
          headerStyle,
          headerTitleStyle,
        }}>
        <Stack.Screen name="Girls NAMES" component={HomeScreen} />
        <Stack.Screen name="SEARCH NAME" component={SearchScreen} />
        <Stack.Screen name="SEARCH BY ALPHABETS" component={NamesByAlphabetsScreen} /> 
      <Stack.Screen name="TRENDING NAMES" component={TrendingNamesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
