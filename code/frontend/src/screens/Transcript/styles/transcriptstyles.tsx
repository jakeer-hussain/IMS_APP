import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  box: {
    borderRadius: 10,
    justifyContent: 'space-evenly',
    backgroundColor: '#FAFAFA',
    padding: 40,
    paddingTop: 0,
    paddingBottom: 20,
    marginBottom: 20,
  },
  cell: {
    borderWidth: 1, // Set border width for all sides
    borderColor: 'black',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    borderWidth: 1.5,
    borderColor: 'black',
    alignSelf: 'center'
  },
  headingRow: {
    backgroundColor: 'lightgray',
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  input3: {
    height: 100,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black', // Ensure consistent border color
    padding: 13,
    width: '90%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    flexWrap: 'wrap',
    borderRadius: 6,
  },
});

export default styles;
