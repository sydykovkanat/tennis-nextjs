'use client';

import { AdminCarouselDialog, Confirm, Loader } from '@/shared/components/shared';
import { useAdminCarousel } from '@/shared/components/shared/carousel/admin/hooks/use-admin-carousel';
import { Button } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn, useAppDispatch, useAppSelector } from '@/shared/lib';
import { photoCarouselState } from '@/shared/lib/features/carousel/carousel-slice';
import { getCarousel } from '@/shared/lib/features/carousel/carousel-thunks';
import { TrashIcon } from '@heroicons/react/24/outline';

import React, { useEffect } from 'react';

import styles from './admin-carousel-item.module.css';

interface CarouselItemForAdminProps {
  className?: string;
}

export const AdminCarouselItem: React.FC<CarouselItemForAdminProps> = ({ className }) => {
  const { user, loadingCarousel, onDelete } = useAdminCarousel();
  const dispatch = useAppDispatch();
  const carousel = useAppSelector(photoCarouselState);

  useEffect(() => {
    if (!carousel.length) {
      dispatch(getCarousel());
    }
  }, [dispatch, carousel.length]);

  return (
    <>
      <div className={cn(styles.containerCarouselItem)}>
        {loadingCarousel ? (
          <div>
            <Loader />
          </div>
        ) : (
          carousel.map((image) => (
            <div key={image._id} className='relative'>
              {image.image ? (
                <img src={API_URL + '/' + image.image} alt={image._id} className={cn(styles.image)} />
              ) : image.video ? (
                <video controls src={API_URL + '/' + image.video} className={cn(styles.video)} />
              ) : null}
              {user && user.role === 'admin' && (
                <div className={cn(styles.blockBtn)}>
                  <Confirm onOk={() => onDelete(image._id)}>
                    <Button className={cn(styles.deleteBtn, className)} data-test-id='delete-file-in-carousel'>
                      <TrashIcon />
                    </Button>
                  </Confirm>

                  <AdminCarouselDialog mode={'edit'} id={image._id} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};
