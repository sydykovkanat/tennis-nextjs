'use client';

import { AdminCarouselDialog, Confirm, Loader } from '@/shared/components/shared';
import { useAdminCarousel } from '@/shared/components/shared/carousel/admin/hooks/use-admin-carousel';
import { Button } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { photoCarouselState } from '@/shared/lib/features/carousel/carousel-slice';
import { getCarousel } from '@/shared/lib/features/carousel/carousel-thunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
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
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {loadingCarousel ? (
          <div>
            <Loader />
          </div>
        ) : (
          carousel.map((image) => (
            <div key={image._id} className='relative'>
              {image.image ? (
                <img src={API_URL + '/' + image.image} alt={image._id} className={cn(styles.image, className)} />
              ) : image.video ? (
                <video controls src={API_URL + '/' + image.video} className={cn(styles.video, className)} />
              ) : null}
              {user && user.role === 'admin' && (
                <div className={cn(styles.blockBtn, className)}>
                  <Confirm onOk={() => onDelete(image._id)}>
                    <Button className='me-3' data-test-id='delete-file-in-carousel'>
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
