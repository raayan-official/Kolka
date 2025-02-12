export const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    // Check if the date is valid
    if (isNaN(date)) {
        return 'Invalid Date';
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
