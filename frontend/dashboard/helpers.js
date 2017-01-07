export const MONTHS = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

export const NUMENDINGS = {
    1: 'st',
    2: 'nd',
    3: 'rd',
};

export const formatDate= date => {
    let month = MONTHS[date.getMonth()];
    let day = date.getDate();
    let ending = (day > 3) ? 'th' : NUMENDINGS[day];
    let dayStrFull = `${day.toString()}${ending}`;
    return `${month} ${dayStrFull} ${date.getFullYear()}`;
};

export const isSameDate = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() && 
        date1.getMonth() === date2.getMonth() && 
        date1.getFullYear() === date2.getFullYear()
    );
};