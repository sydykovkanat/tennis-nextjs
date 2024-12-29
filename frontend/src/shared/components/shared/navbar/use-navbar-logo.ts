import {useState} from 'react';


export const useNavbarLogo = () => {
    const [currentLogo, setCurrentLogo] = useState<string | null>(null);

    return {
        setCurrentLogo,
        currentLogo,
    };
};
