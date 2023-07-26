import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {ContactContext} from './Context';
import {Contact} from './ContactListPage';

const ContactPage: React.FC<{route: Route}> = ({route, navigation}) => {
  const {contactData} = route.params;
  const {contactListParse, setContactListString} = useContext(ContactContext);
  const [contactInfo, setContactInfo] = useState(contactData);
  const [inputFocus, setInputFocus] = useState(0);
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phone = useRef();
  useEffect(() => {
    if (inputFocus < 4) {
      const inputArr = [firstName, lastName, email, phone];
      inputArr[inputFocus]?.current?.focus();
    }
  }, [inputFocus]);

  const newContactList = contactListParse;
  const saveContact = () => {
    if (contactInfo.firstName && contactInfo.lastName) {
      const index = newContactList.findIndex(
        element => element.id === contactInfo.id,
      );
      newContactList[index] = contactInfo;
      setContactListString(newContactList);
      navigation.navigate('ContactListPage');
    } else {
      Alert.alert(
        'Missing Information',
        'First Name and Last Name are required',
        [{text: 'OK'}],
      );
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View style={style.headerContainer}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('ContactListPage')}>
            <Text style={style.headerOptions}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={saveContact}>
            <Text style={style.headerOptions}>Save</Text>
          </TouchableHighlight>
        </View>
        <View style={style.imageContainer} />
        <Text style={style.subheader}>Main Information</Text>
        <ContactInput
          ref={firstName}
          info={contactInfo.firstName}
          field="First Name"
          setContactInfo={setContactInfo}
          setInputFocus={setInputFocus}
        />
        <ContactInput
          ref={lastName}
          info={contactInfo.lastName}
          field="Last Name"
          setContactInfo={setContactInfo}
          setInputFocus={setInputFocus}
        />
        <Text style={style.subheader}>Sub Information</Text>
        <ContactInput
          ref={email}
          info={contactInfo.email}
          field="Email"
          setContactInfo={setContactInfo}
          setInputFocus={setInputFocus}
        />
        <ContactInput
          ref={phone}
          info={contactInfo.phone}
          field="Phone"
          setContactInfo={setContactInfo}
          setInputFocus={setInputFocus}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ContactPage;

const ContactInput: React.FC<{
  info: string;
  field: string;
  setContactInfo: any;
  setInputFocus: any;
}> = React.forwardRef(({info, field, setContactInfo, setInputFocus}, ref) => {
  return (
    <View style={style.textInputContainer}>
      <Text style={style.textField}>{field}</Text>
      <TextInput
        ref={ref}
        keyboardType={field === 'Phone' ? 'number-pad' : 'ascii-capable'}
        style={style.textInput}
        value={info}
        onFocus={() => {
          if (field === 'First Name') {
            setInputFocus(0);
          }
          if (field === 'Last Name') {
            setInputFocus(1);
          }
          if (field === 'Email') {
            setInputFocus(2);
          }
          if (field === 'Phone') {
            setInputFocus(3);
          }
        }}
        onSubmitEditing={() => setInputFocus((prevVal: number) => prevVal + 1)}
        onChange={val => {
          if (field === 'Last Name') {
            setContactInfo((prevInfo: any) => {
              return {...prevInfo, lastName: val.nativeEvent?.text};
            });
          }
          if (field === 'First Name') {
            setContactInfo((prevInfo: any) => {
              return {...prevInfo, firstName: val.nativeEvent?.text};
            });
          }
          if (field === 'Email') {
            setContactInfo((prevInfo: any) => {
              return {...prevInfo, email: val.nativeEvent?.text};
            });
          }
          if (field === 'Phone') {
            setContactInfo((prevInfo: any) => {
              return {...prevInfo, phone: val.nativeEvent?.text};
            });
          }
        }}
      />
    </View>
  );
});

const style = StyleSheet.create({
  subheader: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E7E7E7',
  },
  textField: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  textInput: {
    flex: 2,
    borderWidth: 0.2,
    height: 45,
    color: 'black',
    borderRadius: 5,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.2,
    borderColor: 'grey',
  },
  headerOptions: {
    fontSize: 18,
    color: '#ff8c00',
  },
  headerContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E7E7E7',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: 'black',
  },
  imageContainer: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    backgroundColor: '#ff8c00',
    borderRadius: 100,
    marginBottom: 30,
  },
});

export type Route = {
  params: Contact;
};
