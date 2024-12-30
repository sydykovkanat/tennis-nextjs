import {useAppDispatch, useAppSelector} from '@/shared/hooks/hooks';
import {selectItemsData, selectItemsFetching} from '@/shared/lib/features/footer/footers-slice';
import {useEffect, useState} from 'react';
import {MainLogo} from '@/shared/types/footer.types';
import {fetchCurrentLogo, postCurrentLogo} from '@/shared/lib/features/footer/footers-thunks';
import {useNavbarLogo} from '@/shared/components/shared/navbar/use-navbar-logo';


export const useMainLogoCards = () => {
    const dispatch = useAppDispatch();
    const itemData = useAppSelector(selectItemsData);
    const itemsLoading = useAppSelector(selectItemsFetching);
    const [activeLogoId, setActiveLogoId] = useState<string | null>(null);
    const [logos, setLogos] = useState<MainLogo[]>([]);
    const { setCurrentLogo } = useNavbarLogo();


    useEffect(() => {
        setLogos(itemData[0]?.mainLogo || []);
    }, [itemData]);

    const handleLogoClick = async (id: string, logo:string) => {
        try {
            setActiveLogoId(id);
            setCurrentLogo(logo);
           await dispatch(postCurrentLogo(id)).unwrap();
           await dispatch(fetchCurrentLogo());
        } catch (error) {
            console.error('Ошибка при обновлении логотипа:', error);
        }
    };

    return {
        logos,
        itemsLoading,
        handleLogoClick,
        setLogos,
        activeLogoId,
        setActiveLogoId,
    };
};