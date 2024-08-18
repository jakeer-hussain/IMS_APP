import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import global from '../../../styles/global';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface DateTimeProps {
    onDateSelected: (selectedDate: Date) => void;
}

function DateTime({ onDateSelected }: DateTimeProps): React.JSX.Element {
    const [date, setDate] = useState(new Date());

	const onDatechange = (e: any, selectedDate: Date) => {
		setDate(selectedDate);

        onDateSelected(selectedDate)
        // console.log(date);
	};
    return (
        <SafeAreaView style={global.vertical_2}>
        <RNDateTimePicker
						value={date}
						mode={"date"}
						is24Hour={true}
                        onChange={onDatechange}
					/>

        
        
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
});
export default DateTime;
