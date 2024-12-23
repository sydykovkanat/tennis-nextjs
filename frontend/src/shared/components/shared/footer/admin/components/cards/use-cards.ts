import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemDeleting } from '@/shared/lib/features/footer/footers-slice';
import {
  deleteMenuPosition,
  deleteOneSocialNetwork,
  getFooterItems,
} from '@/shared/lib/features/footer/footers-thunks';
import { MenuPositionFields, SocialNetworkFields } from '@/shared/types/footer.types';
import { toast } from 'sonner';

export const useCards = ([socialItem, menuItem]: [SocialNetworkFields | undefined, MenuPositionFields | undefined]) => {
  const dispatch = useAppDispatch();
  const menuPositionDeleting = useAppSelector(selectItemDeleting);
  const socialNetworkDeleting = useAppSelector(selectItemDeleting);

  const handleDelete = async () => {
    try {
      if (socialItem) {
        await dispatch(deleteOneSocialNetwork(socialItem._id)).unwrap();
        toast.success('Социальная сеть была успешно удалена.');
      } else if (menuItem) {
        await dispatch(deleteMenuPosition(menuItem._id)).unwrap();
        toast.success('Меню положение было успешно удалено.');
      }
      await dispatch(getFooterItems());
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return {
    menuPositionDeleting,
    socialNetworkDeleting,
    handleDelete,
  };
};
