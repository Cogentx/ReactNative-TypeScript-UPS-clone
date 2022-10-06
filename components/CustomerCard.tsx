import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen';
import { Card, Icon, Divider } from '@rneui/themed';

type Props = {
  userId: string;
  email: string;
  name: string;
};

const CustomerCard = ({ userId, email, name }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <TouchableOpacity>
      <Card containerStyle={tw(`p-5 rounded-lg`)}>
        <View>
          <View>
            <Text>{name}</Text>
            <Text>ID: {userId}</Text>
          </View>

          <View>
            <Text>{loading ? 'Loading...' : `${orders.length} x`}</Text>
            <Icon style={tw('mb-5 ml-auto')} name="box" type="entypo" color="#59C1CC" size={50} />
          </View>
        </View>

        <Card.Divider/>

        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
