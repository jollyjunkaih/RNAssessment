import React, {useState, useContext} from 'react';
import {ContactContext} from './Context';
import {
  RefreshControl,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import contacts from './data.json';

const ContactListPage = ({navigation}) => {
  const {contactListParse, setContactListString} = useContext(ContactContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setContactListString(contacts);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  return (
    <>
      <FlatList
        data={contactListParse}
        key={contactListParse.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <ContactCard navigation={navigation} contactData={item} />
        )}
      />
    </>
  );
};

export default ContactListPage;

const ContactCard: React.FC<{contactData: Contact; navigation: any}> = ({
  contactData,
  navigation,
}) => {
  const fullName = contactData.firstName + ' ' + contactData.lastName;
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        navigation.navigate('ContactPage', {contactData});
      }}>
      <View style={styles.contactContainer}>
        <View style={styles.contactImage} />
        <Text style={styles.contactName}>{fullName}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 0.2,
    borderColor: 'grey',
    alignItems: 'center',
  },
  contactImage: {
    borderRadius: 1000,
    height: 50,
    width: 50,
    backgroundColor: '#ff8c00',
  },
  contactName: {fontSize: 16, marginLeft: 15, color: 'black'},
});

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
};
