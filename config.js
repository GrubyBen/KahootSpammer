const config = {
    port: 2137,
    proxyUrls: [
        'http://www.janvet.website.pl',
        'https://bramka-proxy.pl',
    ],
};

function getConfig() {
    return config;
}
module.exports = { getConfig };