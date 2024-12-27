import React, {FormEvent, useState} from 'react';
import {MainLogoMutation} from '@/shared/types/footer.types';
import {toast} from 'sonner';
import {useAppDispatch, useAppSelector} from '@/shared/hooks/hooks';
import {createMainLogo, getFooterItems} from '@/shared/lib/features/footer/footers-thunks';
import {selectMainLogo} from '@/shared/lib/features/footer/footers-slice';

const emptyState: MainLogoMutation  = {
    logo: null,
};


export const useMainLogoForm = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [newLogo, setNewLogo] = useState<MainLogoMutation>(emptyState);
    const dispatch = useAppDispatch();


    const onChangeFileInputLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
        setNewLogo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageUpload = async (event: FormEvent) => {
        event.preventDefault();

        if (!newLogo.logo) {
            toast.warning('Выберите лого!');
            return;
        }
        try {
            await dispatch(createMainLogo(newLogo)).unwrap();
            setNewLogo(emptyState);
            await dispatch(getFooterItems());
            toast.success('Лого успешно выложено');
            setAddModalOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Не удалось загрузить лого');
        }
    };

    return {
        isAddModalOpen,
        setAddModalOpen,
        onChangeFileInputLogo,
        newLogo,
        handleImageUpload
    };
};