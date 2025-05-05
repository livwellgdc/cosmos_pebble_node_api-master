/**
 *
 * @param {Number} phoneNumber last 2 digits of a phone number
 * @param {Number} splitFactor how many parts of users to get data
 */
const ifShowData = (phoneNumber, splitFactor) => {
    if (splitFactor < 1) throw new Error('split factor should be greater than 0');
    const factor = phoneNumber % splitFactor;
    return factor === 0;
};

export { ifShowData };
