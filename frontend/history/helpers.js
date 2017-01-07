const months = {
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

const numberEndings = {
    1: 'st',
    2: 'nd',
    3: 'rd',
};

export const formatDate= date => {
    let month = months[date.getMonth()];
    let day = date.getDate();
    let ending = (day > 3) ? 'th' : numberEndings[day];
    let dayStrFull = `${day.toString()}${ending}`;
    return `${month} ${dayStrFull} ${date.getFullYear()}`;
};