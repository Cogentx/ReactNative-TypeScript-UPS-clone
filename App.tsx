import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import RootNavigator from './navigator/RootNavigator';
import utilities from './tailwind.json';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';


// use stepzen api created in './stepzen'
// NOTE: when using iOS device on local WiFi; use the IP address that Expo Metro is using (your local wifi IP -- NOT LocalHost); keep same port number
const client = new ApolloClient({
  uri: `http://192.168.2.12:5001/api/dev-zen`,
  cache: new InMemoryCache(),
});

// Wrap App in Higher Level Components
export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
