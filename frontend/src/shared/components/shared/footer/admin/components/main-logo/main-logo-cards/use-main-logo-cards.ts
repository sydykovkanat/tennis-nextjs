import {useAppDispatch, useAppSelector} from '@/shared/hooks/hooks';
import {selectItemsData} from '@/shared/lib/features/footer/footers-slice';


export const useMainLogoCards = () => {
    const dispatch = useAppDispatch();
    const itemData = useAppSelector(selectItemsData);
    return {
        dispatch,
        itemData,
    };
};