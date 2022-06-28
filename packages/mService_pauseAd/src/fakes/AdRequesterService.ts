
export const getAds = async (url: string | unknown): Promise<string[]> => {

    let adNumber = 0;

    const ads = [];
    const total = Math.floor(Math.random() * 20);

    for (let i = 0; i < total; i++) {
        ads.push(`Ad #${++adNumber} the url ${url}`);
    }

    return Promise.resolve(ads);
}