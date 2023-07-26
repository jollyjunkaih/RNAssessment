import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactPage from './ContactPage';
import ContactListPage from './ContactListPage';
import ContactProvider from './Context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ContactListPage">
          <Stack.Screen
            options={{
              headerTitle: 'Contacts',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Icon name="add" size={30} color={'#ff8c00'} />
              ),
              headerLeft: () => (
                <Icon name="search" size={30} color={'#ff8c00'} />
              ),
            }}
            name="ContactListPage"
            component={ContactListPage}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ContactPage"
            component={ContactPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}

export default App;
