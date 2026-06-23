'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '../card/Card';
import Paragraph from '../typography/paragraph/Paragraph';
import Image from 'next/image';

type Client = {
  id: number;
  name: string;
  position: string;
  review: string;
  profileImage: string;
};

const clients: Client[] = [
  {
    id: 1,
    name: 'Trent Hoerr',
    position: 'Founder/COO at FPFX Technologies',
    review:
      'Amazing creativity and design skills. Extremely fast and efficient. Delivered the project well in advance and provided excellent suggestions to improve our design.',
    profileImage: '/profile-images/profile_1.svg',
  },
  {
    id: 2,
    name: 'Juan Arango',
    position: 'CEO and Founder at Magnaverse',
    review:
      'Petar is a great guy. Very professional, diligent and flexible. What he promised he delivered and within the expected timeframe.',
    profileImage: '/profile-images/profile_2.svg',
  },
  {
    id: 3,
    name: 'Michael Ross',
    position: 'Product Manager at FintechX',
    review:
      'Outstanding work quality and communication. The project exceeded expectations and was delivered flawlessly.',
    profileImage: '/profile-images/profile_3.svg',
  },
  {
    id: 4,
    name: 'Anna Keller',
    position: 'Marketing Director at Brandify',
    review:
      'Creative, reliable and very easy to work with. Highly recommended for any design or frontend work.',
    profileImage: '/profile-images/profile_4.svg',
  },
  {
    id: 5,
    name: 'David Chen',
    position: 'CTO at ScaleTech',
    review:
      'Strong technical skills and attention to detail. Delivered clean and scalable solutions.',
    profileImage: '/profile-images/profile_5.svg',
  },
];

export default function ClientSlider() {
  return (
    <div className='w-full client-slider'>
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={2}
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {clients.map((client) => (
          <SwiperSlide key={client.id}>
            <Card className='relative mb-3 min-h-[6.875rem]'>
              <Paragraph className='relative z-10'>{client.review}</Paragraph>
              <div className='absolute -bottom-1.5 left-8 w-3 h-3 bg-card rotate-[135deg]'></div>
              <Image
                width={44}
                height={44}
                src='/quote_light.svg'
                alt='Quote'
                className='absolute z-0 bottom-2 right-2 opacity-10'
              />
            </Card>
            <div className='ml-5'>
              <div className='flex items-center gap-3'>
                <div className='bg-card p-2 rounded-full'>
                  <Image
                    width={22}
                    height={22}
                    src={client.profileImage}
                    alt={client.name}
                  />
                </div>
                <div className='flex flex-col'>
                  <span className='text-title'>{client.name}</span>
                  <span className='text-muted text-xs'>{client.position}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
