const fn = () => {
    const openMail = () => window.open('mailto:admin1@ggtoners.com');
    const openLocalSlug = (url) => window.location.replace(url);
    const openInNewTab = (url) => window.open(url, '_blank');

    return {
        openMail,
        openLocalSlug,
        openInNewTab,
    };
};

export default fn;
