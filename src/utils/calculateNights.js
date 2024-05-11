export const calculateNights = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const timeDifference = Math.abs(endDate - startDate);
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};