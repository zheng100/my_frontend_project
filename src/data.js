function avatarData(dataType) {
    const avatarSytleData = {
        "mouth" : ['Smile','Eating','Concerned','Default','Disbelief','Grimace','Tongue','Twinkle','Vomit','Serious','Sad','ScreamOpen'],
        "eyes": ['Dizzy','Close','EyeRoll','Cry','Happy','Hearts','Side','Squint','Surprised','Wink','WinkWacky'],
        "eyebrows": ['Angry','AngryNatural','Default','DefaultNatural','FlatNatural','RaisedExcited','RaisedExcitedNatural','SadConcerned','SadConcernedNatural','UnibrowNatural','UpDownNatural'],
        "accessories": ['Kurt','Blank','Prescription01','Prescription02','Round','Sunglasses','Wayfarers'],
        "top": ['NoHair','Eyepatch','Hat','Hijab','Turban','WinterHat1','WinterHat2','WinterHat3','WinterHat4',
        'LongHairBigHair','LongHairBob','LongHairBun','LongHairCurly','LongHairCurvy','LongHairDreads','LongHairFrida','LongHairFro','LongHairFroBand',
        'LongHairNotTooLong','LongHairShavedSides','LongHairMiaWallace','LongHairStraight','LongHairStraight2','LongHairStraightStrand','ShortHairDreads01',
        'ShortHairDreads02','ShortHairFrizzle','ShortHairShaggyMullet','ShortHairShortCurly','ShortHairShortFlat','ShortHairShortRound','ShortHairShortWaved',
        'ShortHairSides','ShortHairTheCaesar','ShortHairTheCaesarSidePart'],
        "facialHair": ['Blank','BeardMedium','BeardLight','BeardMajestic','MoustacheFancy','MoustacheMagnum'],
        "clothe": ['BlazerShirt','BlazerSweater','CollarSweater','GraphicShirt','Hoodie','Overall','ShirtCrewNeck','ShirtScoopNeck','ShirtVNeck']
    }

    const initData = {
        "mouth" : "Default",
        "eyes" : "Happy",
        "accessories" : "Blank",
        "facialHair" : "Blank",
        "clothe" : "ShirtCrewNeck",
        "top" : "ShortHairShortFlat",
        "eyebrows" : "RaisedExcitedNatural",
        "hairColor" :"Auburn",
        "clotheColor" :"Gray01",
        "skinColor" :"Light"
    }

    const colorData = {
        "hairColor" : {'Auburn': '#A55728',
        'Black': '#2C1B18',
        'Blonde': '#B58143',
        'BlondeGolden': '#D6B370',
        'Brown': '#724133',
        'BrownDark': '#4A312C',
        'PastelPink': '#F59797',
        'Platinum': '#ECDCBF',
        'Red': '#C93305',
        'SilverGray': '#E8E1E1'
        },
        "skinColor" :{'Tanned':'#FD9841',
        'Yellow':'#F8D25C',
        'Pale':'#FFDBB4',
        'Light':'#EDB98A',
        'Brown':'#D08B5B',
        'DarkBrown':'#AE5D29',
        'Black':'#614335'
        },
        "clotheColor":{
        'Black':'#262E33',
        'Blue01':'#65C9FF',
        'Blue02':'#5199E4',
        'Blue03':'#25557C',
        'Gray01':'#E6E6E6',
        'Gray02':'#929598',
        'Heather':'#3C4F5C',
        'PastelBlue':'#B1E2FF',
        'PastelGreen':'#A7FFC4',
        'PastelOrange':'#FFDEB5',
        'PastelRed':'#FFAFB9',
        'PastelYellow':'#FFFFB1',
        'Pink':'#FF488E',
        'Red':'#FF5C5C',
        'White':'#FFFFFF',
        }
    }

    if (dataType === 'style'){return avatarSytleData};
    if (dataType === 'init'){return initData};
    if (dataType === 'hairColor'){return colorData["hairColor"]};
    if (dataType === 'skinColor'){return colorData["skinColor"]};
    if (dataType === 'clotheColor'){return colorData["clotheColor"]};

    return;
}


export default avatarData;
