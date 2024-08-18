import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {View, Image, Text} from 'react-native';
import styles from '../Styles/LoginStyles'
function TreeLogo(){
    const [errorText, setErrorText] = React.useState('');
    return (
        <SafeAreaView>
            <View style={styles.container}>
            <Image
              source={require('../../../assets/icons/IIIT_Logo.png')}
              style={styles.image}
            />
          </View>
          <View style = {styles.text}>
            <Text style={{ fontSize: 20, color: '#161C51', fontWeight: 'bold'}}>
                Login with your LDAP Credentials
            </Text>
            {errorText ? (
              <Text style={{ fontSize: 20, color: 'red', textAlign: 'center', marginTop: 20}}>
                {errorText}
              </Text>
            ) : null}
          </View>
          <View style = {styles.Login_text}>
            
          </View>
        </SafeAreaView>
    );
};

export default TreeLogo;