import React, { useState,useEffect } from 'react'; 
import Avatar from 'avataaars';


function ModAvatar(props) {
    const [avatarDetails,setavatarDetails] = useState(props.avaDetails);
    useEffect(() => { setavatarDetails(props.avaDetails) }, [props.avaDetails]);

    return (
        <Avatar
        style={{width: '350px', height: '350px'}}
        avatarStyle='Circle'
        topType={avatarDetails['top']}
        accessoriesType={avatarDetails['accessories']}
        hairColor={avatarDetails['hairColor']}
        facialHairType={avatarDetails['facialHair']}
        clotheType={avatarDetails['clothe']}
        clotheColor={avatarDetails['clotheColor']}
        eyeType={avatarDetails['eyes']}
        eyebrowType={avatarDetails['eyebrows']}
        mouthType={avatarDetails['mouth']}
        skinColor={avatarDetails['skinColor']}/>
    );

}


export default ModAvatar;
