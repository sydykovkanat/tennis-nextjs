'use client';

import { DialogInCarouselItemForChangeFile, Loader } from '@/shared/components/shared';
import { useAdminCarousel } from '@/shared/components/shared/carousel/admin/hooks/use-admin-carousel';
import { Confirm } from '@/shared/components/shared/confirm/confirm';
import { Button } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { TrashIcon } from '@heroicons/react/24/outline';

import React from 'react';

interface CarouselItemForAdminProps {
  className?: string;
}

export const CarouselItemForAdmin: React.FC<CarouselItemForAdminProps> = ({ className }) => {
  const { user, carousel, loadingCarousel, onDelete } = useAdminCarousel();
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
                <img
                  src={API_URL + '/' + image.image}
                  alt={image._id}
                  className='rounded-lg object-cover h-full w-full max-h-[300px]'
                />
              ) : image.video ? (
                <video
                  controls
                  src={API_URL + '/' + image.video}
                  className='rounded-lg object-cover h-full w-full max-h-[300px]'
                />
              ) : null}
              {user && user.role === 'admin' && (
                <div className='top-3 left-6 absolute'>
                  <Confirm onOk={() => onDelete(image._id)}>
                    <Button className='me-3' data-test-id='delete-file-in-carousel'>
                      <TrashIcon />
                    </Button>
                  </Confirm>

                  <DialogInCarouselItemForChangeFile id={image._id} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};
