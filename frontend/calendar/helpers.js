import moment from 'moment';

export const getRange = (frm, to) => {
    let units = [];
    let unit = frm;
    while (unit <= to) {
        units.push(unit);
        unit++;
    }
    return units;
};

export const rangeOfDaysInMonth = (month) => {
    let numOfDays = moment(month+1, "M").daysInMonth();
    return getRange(1, numOfDays);
};

export const getDates = (date) => {
    // debugger;
    let month = moment(date, 'ddd MMM DD').get('month');
    let previousMonth = (month - 1 !== -1) ? month - 1 : 11;
    let nextMonth = (month + 1) % 12;
    // let range = this.rangeOfDaysInMonth(previousMonth).concat(this.rangeOfDaysInMonth(month)).concat(this.rangeOfDaysInMonth(nextMonth));
    let result = rangeOfDaysInMonth(previousMonth).map(date => moment(`${previousMonth+1} ${date}`, "M D").format('ddd MMM DD'));
    result = result.concat(rangeOfDaysInMonth(month).map(date => moment(`${month+1} ${date}`, "M D").format('ddd MMM DD')));
    result = result.concat(rangeOfDaysInMonth(nextMonth).map(date => moment(`${nextMonth+1} ${date}`, "M D").format('ddd MMM DD')));
    return result;
};  