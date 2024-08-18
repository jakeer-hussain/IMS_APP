import React from 'react';
import { View, SafeAreaView, Text, Image} from 'react-native';


function NoNetwork(): React.JSX.Element {

  return (
    <SafeAreaView style={{marginTop: 20}}>
         <Image
              source={require('../../assets/icons/IIIT_Logo.png')}
            />
        <Text style={{marginHorizontal: 70, fontSize: 20, color: 'black', marginTop: 100}}>
            You are not connected  to Internet. 
            Please Check your internet connection and try again.
        </Text>
    </SafeAreaView>
    );
}

export default NoNetwork;
