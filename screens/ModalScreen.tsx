import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { Icon } from '@rneui/base';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

type ModalScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'MyModal'>
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>;

const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProps>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();
  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack} style={tw('absolute right-5 top-5 z-10')}>
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View>
        <Text>{name}</Text>
        <Text>{userId}</Text>
      </View>

      <FlatList data={orders} keyExtractor={(order) => order.trackingId} renderItem={({item: order}) => <DeliveryCard order={order}/>}/>
    </View>
  );
};

export default ModalScreen;
