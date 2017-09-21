import EStyleSheet from 'react-native-extended-stylesheet';

// Set Global variables
EStyleSheet.build({
  inputColor: "#7f9fbf",
  textColor: '#0275d8',
  greenCaddie: '#488b2d',
  darkCaddie: '#247A16',
  blueGolfer: '#3E7BE6',
  buttonDefault: '#142E25',
  buttonGrey: '#AEC7BA',
  modalGrey: '#F6F6F6',
  modalBlue: '#007AFF',
  redError: '#FF4402',
  itemGrey: '#7C8E84',
  white: '#ffffff',
  subTitleDefault: '#142E25',
  placeholderDefault: '#7f9fbf',
});


const commonStyles = EStyleSheet.create({

  title: {
    marginTop: 10,
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    margin: 5,
    fontFamily: 'San Francisco Display',
    fontWeight: '300',
    marginBottom: 0,
  },
  formTitle: {
    color: 'rgba(10,46,37,0.5)',
    marginBottom: -3,
    marginTop: 10,
    alignSelf: 'flex-start',
    fontFamily: 'San Francisco Display',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1
  },
  subTitle: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    width: '85%',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'San Francisco Display',
    fontWeight: '300',
    marginTop:'2%',
  },
  screenBottom: {
    alignSelf: 'center',
    marginBottom:'2%',
  }

});

export default commonStyles;
