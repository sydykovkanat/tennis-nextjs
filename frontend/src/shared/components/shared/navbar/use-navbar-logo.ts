import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/shared/hooks/hooks';
import {selectCurrentLogo} from '@/shared/lib/features/footer/footers-slice';
import {
    useMainLogoCards
} from '@/shared/components/shared/footer/admin/components/main-logo/main-logo-cards/use-main-logo-cards';
import {fetchCurrentLogo} from '@/shared/lib/features/footer/footers-thunks';


export const useNavbarLogo = () => {
    const [currentLogo, setCurrentLogo] = useState<string | null>(null);
    const logoId = useAppSelector(selectCurrentLogo);
    const dispatch = useAppDispatch();
    const { logos } = useMainLogoCards();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(fetchCurrentLogo());
    }, [dispatch]);

    useEffect(() => {
        try {
            if (logoId) {
                const logoObject = logos.find((logo) => logo._id === logoId);
                setCurrentLogo(logoObject ? logoObject.logo : 'kslt.svg');
                setLoading(false);
            }else {
                setLoading(false);
                setCurrentLogo('kslt.svg');
            }
        } catch (error) {
            console.error('Ошибка загрузки логотипа:', error);
            setCurrentLogo('kslt.svg');
        }
    }, [logoId, logos, dispatch, setCurrentLogo]);


    return {
        setCurrentLogo,
        currentLogo,
        loading,
    };
};
