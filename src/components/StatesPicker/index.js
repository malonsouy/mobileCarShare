import React, { Component } from 'react';
import {
  Text,
  PickerIOS,
  View,
  Platform,
  Picker
} from 'react-native';

import I18n from '../../utils/i18n';
import CStyle from '../../utils/commonStyles';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modalbox';
import CustomButton from '../../components/CustomButton';

let SelectedPicker = Platform.OS === 'ios' ? PickerIOS : Picker;

class StatesPicker extends Component {

  constructor(props){
    super(props);
    this.state= {
      selectedItem: null
    };
  }

  render() {
    const {selectedItem} = this.state;
    return (
      <Modal
        style={styles.modal}
        isOpen={this.props.openedModal}
        ref="modal"
        swipeToClose={false}
        position="bottom"
        forceToFront={true} >
          <Text style={styles.modalTitle}>Select your state</Text>
          <View style={{flex: 0.5, justifyContent: 'center'}}>
            <SelectedPicker
            style={{height: 180}}
            selectedValue={selectedItem}
            onValueChange={(item) => this.setState({selectedItem: item}) }>
              {I18n('pickers.usaStates').map((s, i) => {
                return <Picker.Item label={s} value={s} key={i} />})}
            </SelectedPicker>
          </View>
          <View style={styles.container}>
            <Text 
              style={[styles.modalBar, styles.cancelButton]} 
              onPress={this.props.onCancel} >
                Cancel
            </Text>
            <Text 
              style={[styles.modalBar, styles.confirmButton]} 
              onPress={() => this.props.onConfirm(selectedItem)} >
                Confirm
            </Text>
          </View>
      </Modal>
    );
  }
}

const styles = EStyleSheet.create({

  modalTitle: {
    color: '$blueGolfer',
    fontSize: 25,
    marginVertical: 50,
    textAlign: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  modal: {
    height: 300,
    paddingBottom: 80
  },
  modalBar: {
    fontSize: 16
  },
  cancelButton: {
    color: '#777'
  },
  confirmButton: {
    color: '#3D98BF'
  }
});

export default StatesPicker;
