const uppercaseAbbreviations = [
    'llc',
    'afb',
];

const fn = () => {
    // takes any string and capitalizes the first letter of each word
    // also capitalizes scottish/irish surnames appropriately
    // const capitalize = (string) => string && string.toLowerCase().replace(/(?:(?<=\b(?:ma?c)?))\w/g, (char) => char.toUpperCase());
    const capitalize = (string = '', splitter = ' ') => (string
        .toLowerCase()
        .split(splitter)
        .filter((word) => !!word)
        .map((word) => {
            if (uppercaseAbbreviations.includes(word)) return word.toUpperCase();
            if (word.includes('-')) return `${capitalize(word, '-')}`;
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(splitter));

    // formats 6 digit canadian zipcodes as one would expect
    const formatZipCode = (val) => {
        if (!val) return '';
        if (val.length === 6) return `${val.substring(0, 3)} ${val.substring(3)}`.toUpperCase();
        return val;
    };

    // takes a name, splits at the space, and grabs the first letter of name[0] and name[1] returns them concatenated and toUpperCase
    const formatInitials = (val) => {
        if (!val) return '';
        const firstI = val.split(' ')[0].slice(0, 1);
        const lastI = val.split(' ')[1].slice(0, 1);
        const initials = firstI + lastI;
        return initials.toUpperCase();
    };

    // takes phone number string and formats it like (555) 867 - 5309
    const formatPhone = (string) => {
        if (!string) return undefined;
        let formatted = '';
        if (string.length === 10) formatted = string.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2 - $3');
        if (string.length === 11) formatted = string.replace(/^(\d{1})(\d{3})(\d{3})(\d{4})$/, '$1($2) - $3 - $4');
        return formatted;
    };

    // truncate a string to a certain character length
    const truncate = (string, length) => {
        if (!string || typeof string !== 'string') return undefined;
        let ellipsis = '...';
        if (string && string.length <= length) ellipsis = '';
        return string && length && `${string.substring(0, length)}${ellipsis}`;
    };

    const formatPercent = (percent, digits = 1) => {
        const value = (new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: digits,
            trailingZeroDisplay: 'lessPrecision',
        }).format(percent));
        return value;
    };
    const formatCurrency = (number, currencySign = 'standard', digits = 0) => {
        const value = new Intl.NumberFormat('en-US', {
            style: 'currency',
            maximumFractionDigits: digits,
            currency: 'USD',
            currencySign,
        }).format(number);
        // if (currencySign === 'standard') return value.replace('$', '');
        return value;
    };

    return {
        capitalize,
        formatInitials,
        formatPhone,
        truncate,
        formatZipCode,
        formatPercent,
        formatCurrency,
    };
};

export default fn;
