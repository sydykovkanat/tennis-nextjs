import {useAppDispatch, useAppSelector} from '@/shared/hooks/hooks';
import {
    selectCurrentLogo,
    selectErrorLogo,
    selectItemsData,
    selectItemsFetching,
} from '@/shared/lib/features/footer/footers-slice';
import {useEffect, useState} from 'react';
import {MainLogo} from '@/shared/types/footer.types';
import {
    fetchCurrentLogo,
    fetchDeleteLogo,
    getFooterItems,
    postCurrentLogo
} from '@/shared/lib/features/footer/footers-thunks';

import {toast} from 'sonner';


export const useMainLogoCards = () => {
    const dispatch = useAppDispatch();
    const logoId = useAppSelector(selectCurrentLogo);
    const itemData = useAppSelector(selectItemsData);
    const itemsLoading = useAppSelector(selectItemsFetching);
    const logoError = useAppSelector(selectErrorLogo);
    const [logos, setLogos] = useState<MainLogo[]>([]);




    useEffect(() => {
        setLogos(itemData[0]?.mainLogo || []);
    }, [itemData]);

    const handleLogoClick = async (id: string) => {
        try {
           await dispatch(postCurrentLogo(id)).unwrap();
           await dispatch(fetchCurrentLogo());
           toast.success(' Логотип успешно заменен ');
        } catch (error) {
            toast.error('Ошибка при обновлении логотипа');
            console.error('Ошибка при обновлении логотипа:', error);
        }
    };

    const handleDeleteLogo = async (id: string) => {
        try {
            await dispatch(fetchDeleteLogo({ id })).unwrap();
            await dispatch(getFooterItems()).unwrap();
            toast.success('Логотип успешно удален');
        } catch (error) {
            console.log(logoError);
            console.error('Ошибка при удаление логотипа:', error);
            toast.error('Ошибка при удаление логотипа');
        }
    };


    return {
        logos,
        itemsLoading,
        handleLogoClick,
        setLogos,
        handleDeleteLogo,
        logoId,
    };
};