import I18n from './i18n';
import Moment from 'moment';

const setPickersArrays = {

	setMonthNumbers(){
		if (I18n('pickers.monthNumber').length === 0) {
			for (var i = 1; i <= 12 ; i++) {
				I18n('pickers.monthNumber').push(i);
			}
		}
	},

	setDayNumbers(){
		if (I18n('pickers.dayNumber').length === 0) {
			for (var i = 1; i <= 31 ; i++) {
				I18n('pickers.dayNumber').push(i);
			}
		}
	},

	setYearNumbers(){
		if (I18n('pickers.yearNumber').length === 0) {
			const actualYear = Moment().format('YYYY');

			for (var i = 1900; i <= actualYear ; i++) {
				I18n('pickers.yearNumber').push(i);
			}
		}
	}

}

export default setPickersArrays;