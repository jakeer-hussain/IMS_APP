import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {userMail}  from '../../Login/Login';
import {userName} from '../../Login/Login';

const handwaveImagePath = '../../../assets/icons/handwave.png';

function logo(): React.JSX.Element {

  // console.log(userMail);

  var wordsArray = userName.split(" ");

  var firstName = wordsArray[0];

    return (
      <SafeAreaView style={styles.vertical}>

        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontSize: 23, fontWeight: "bold", color: "#000000"}}>
            Hi {firstName}
          </Text>
        </View>
        <View style={{ paddingLeft: 10}}>
          <Image
                source={require(handwaveImagePath)}
                style = {{width: 35, height: 35}}
          />
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      top: 0,
      right: 0,
      marginRight: 40,
      marginTop: -20,
      // margin: 16,

  },
  image: {
      width: 150,
      height: 65,
      resizeMode: 'contain',
  },

  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

});

export default logo;
