export const getRange = (frm, to) => {
    let units = [];
    let unit = frm;
    while (unit <= to) {
        units.push(unit);
        unit++;
    }
    return units;
};