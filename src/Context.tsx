import React, {createContext, useState} from 'react';
import contacts from './data.json';
export const ContactContext = createContext();

const ContactProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [contactList, setContactList] = useState(JSON.stringify(contacts));
  // react does not recognise any changes when the contact list array changes so I created a hook that stringifies it
  const setContactListString = contactList => {
    setContactList(JSON.stringify(contactList));
  };
  const contactListParse = JSON.parse(contactList);
  return (
    <ContactContext.Provider value={{contactListParse, setContactListString}}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
