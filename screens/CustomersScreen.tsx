import { ActivityIndicator, ScrollView, Text } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Image, Input } from '@rneui/themed';
import { GET_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import CustomerCard from '../components/CustomerCard';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>('');
  const { loading, error, data } = useQuery(GET_QUERY);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#59C1CC' }}>
      <Image
        source={{ uri: 'https://i.imgur.com/uU8GTZM.jpeg' }}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw('bg-white pt-5 pb-0 px-10')}
      />

      {loading && <Text>Loading...</Text>}

      {error && <Text>{JSON.stringify(error, null, 2)}</Text>}

      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
    </ScrollView>
  );
};

export default CustomersScreen;

// {/* rename 'name' to 'ID' and deconstruct 'value' to 'email' and 'name' */}
// {
//   data?.getCustomers.map(({ name: ID, value: { email, name } }: CustomerResponse) => (
//     <CustomerCard key={ID} userId={ID} email={email} name={name} />
//   ));
// }
