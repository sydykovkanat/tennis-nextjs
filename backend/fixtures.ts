import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import { Carousel } from './src/model/Carousel';
import { Category } from './src/model/Category';
import { Event } from './src/model/Event';
import Footer from './src/model/Footer';
import { News } from './src/model/News';
import { Partner } from './src/model/Partner';
import { Rating } from './src/model/Rating';
import { RatingMember } from './src/model/RatingMember';
import { Reward } from './src/model/Reward';
import { Tournament } from './src/model/Tournament';
import { User } from './src/model/User';
import { generateUsers } from './src/utils/fixtures/generateUsers';
import { mainRatingsFixtures } from './src/utils/fixtures/mainRatingsFixtures';
import { newsFixtures } from './src/utils/fixtures/newsFixtures';
import { tournamentsFixtures } from './src/utils/fixtures/tournamentsFixtures';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('users');
    await db.dropCollection('partners');
    await db.dropCollection('carousels');
    await db.dropCollection('news');
    await db.dropCollection('ratings');
    await db.dropCollection('rewards');
    await db.dropCollection('ratingmembers');
    await db.dropCollection('tournaments');
    await db.dropCollection('footers');
  } catch (e) {
    console.log('Skipping drop...');
  }

  await News.create(newsFixtures);

  await Partner.create(
    {
      name: 'Knauf',
      image: 'logo/Knauf.svg',
      url: 'https://www.knauf.com',
    },
    {
      name: 'Argon',
      image: 'logo/Argon.svg',
      url: 'https://www.argon.com',
    },
    {
      name: 'Astar',
      image: 'logo/astar.svg',
      url: 'https://www.astar.com',
    },
    {
      name: 'T-club',
      image: 'logo/t-club.svg',
      url: 'https://www.t-club.com',
    },
    {
      name: 'Babolat',
      image: 'logo/babolat.svg',
      url: 'https://www.babolat.com',
    },
    {
      name: 'Artium',
      image: 'logo/Artium.svg',
      url: 'https://www.artium.com',
    }
  );

  const [masters, proMasters, futures] = await Category.create(
    {
      name: 'Masters',
    },
    {
      name: 'ProMasters',
    },
    {
      name: 'Futures',
    }
  );

  await generateUsers(masters, proMasters, futures);

  const [john, alice] = await User.create(
    {
      category: masters._id,
      fullName: 'John Doe',
      telephone: '0555 555 555',
      dateOfBirth: '2007-10-15',
      gender: 'male',
      role: 'admin',
      password: '123qwe',
      email: 'john@gmail.com',
      token: randomUUID(),
    },
    {
      category: proMasters._id,
      fullName: 'Alice Doe',
      telephone: '0999 999 999',
      dateOfBirth: '2004-12-25',
      gender: 'female',
      password: '123qwe',
      email: 'alice@gmail.com',
      token: randomUUID(),
    },
     {
      category: masters._id,
      fullName: 'Test User',
      telephone: '0111 111 111',
      dateOfBirth: '2007-10-15',
      gender: 'male',
      role: 'admin',
      password: '123qwe',
      email: 'test1@gmail.com',
      token: randomUUID(),
    },
     {
      category: masters._id,
      fullName: 'Test User',
      telephone: '0222 222 222',
      dateOfBirth: '2007-10-15',
      gender: 'male',
      role: 'admin',
      password: '123qwe',
      email: 'test2@gmail.com',
      token: randomUUID(),
    },
  );

  await Reward.create(
    {
      user: john,
      createdAt: '2024-12-02T16:15:36.700+00:00',
      updatedAt: '2024-12-03T16:15:36.700+00:00',
      tournament: 'Winter Gold Cup',
      place: undefined,
      nomination: 'Лучшая техника',
      icon: 'racket',
    },
    {
      user: john,
      createdAt: '2024-12-01T16:15:36.700+00:00',
      updatedAt: '2024-12-02T16:15:36.700+00:00',
      tournament: 'Spring Silver League',
      place: 2,
      nomination: 'Лучший игрок',
      icon: 'medal',
    },
    {
      user: john,
      createdAt: '2024-11-30T16:15:36.700+00:00',
      updatedAt: '2024-12-01T16:15:36.700+00:00',
      tournament: 'Summer Bronze Cup',
      place: 3,
      nomination: 'Лучший тренер',
      icon: 'cup',
    },
    {
      user: john,
      createdAt: '2024-11-29T16:15:36.700+00:00',
      updatedAt: '2024-11-30T16:15:36.700+00:00',
      tournament: 'Autumn Platinum Series',
      place: 1,
      nomination: 'Лучшая стратегия',
      icon: 'cup',
    },
    {
      user: john,
      createdAt: '2024-11-28T16:15:36.700+00:00',
      updatedAt: '2024-11-29T16:15:36.700+00:00',
      tournament: 'Winter Gold Cup',
      place: 3,
      nomination: 'Лучший лидер',
      icon: 'racket',
    },
    {
      user: alice,
      createdAt: '2024-12-02T16:15:36.700+00:00',
      updatedAt: '2024-12-03T16:15:36.700+00:00',
      tournament: 'Winter Gold Cup',
      place: 2,
      nomination: 'Лучший лидер',
      icon: 'medal',
    },
    {
      user: alice,
      createdAt: '2024-12-01T16:15:36.700+00:00',
      updatedAt: '2024-12-02T16:15:36.700+00:00',
      tournament: 'Spring Silver League',
      place: 3,
      nomination: 'Лучшая стратегия',
      icon: 'cup',
    },
    {
      user: alice,
      createdAt: '2024-11-30T16:15:36.700+00:00',
      updatedAt: '2024-12-01T16:15:36.700+00:00',
      tournament: 'Summer Bronze Cup',
      place: 1,
      nomination: 'Лучший игрок',
      icon: 'cup',
    }
  );

  // for (let i = 0; i < 5; i++) {
  //   await Reward.create(
  //     {
  //       user: john,
  //       createdAt: '2024-12-02T16:15:36.700+00:00',
  //       updatedAt: '2024-12-03T16:15:36.700+00:00',
  //       tournament: 'Winter Gold Cup',
  //       place: 1,
  //       nomination: 'Лучшая техника',
  //       icon: 'cup',
  //     },
  //     {
  //       user: john,
  //       createdAt: '2024-12-01T16:15:36.700+00:00',
  //       updatedAt: '2024-12-02T16:15:36.700+00:00',
  //       tournament: 'Spring Silver League',
  //       place: 2,
  //       nomination: 'Лучший игрок',
  //       icon: 'medal',
  //     },
  //     {
  //       user: john,
  //       createdAt: '2024-11-30T16:15:36.700+00:00',
  //       updatedAt: '2024-12-01T16:15:36.700+00:00',
  //       tournament: 'Summer Bronze Cup',
  //       place: 3,
  //       nomination: 'Лучший тренер',
  //       icon: 'cup',
  //     },
  //     {
  //       user: john,
  //       createdAt: '2024-11-29T16:15:36.700+00:00',
  //       updatedAt: '2024-11-30T16:15:36.700+00:00',
  //       tournament: 'Autumn Platinum Series',
  //       place: 1,
  //       nomination: 'Лучшая стратегия',
  //       icon: 'cup',
  //     },
  //     {
  //       user: john,
  //       createdAt: '2024-11-28T16:15:36.700+00:00',
  //       updatedAt: '2024-11-29T16:15:36.700+00:00',
  //       tournament: 'Winter Gold Cup',
  //       place: 3,
  //       nomination: 'Лучший лидер',
  //       icon: 'cup',
  //     }
  //   );
  // }

  await RatingMember.create(mainRatingsFixtures);

  await Tournament.create(tournamentsFixtures);

  await Carousel.create([
    {
      image: 'fixtures/carousel/photo-1.jpg',
    },
    {
      image: 'fixtures/carousel/photo-2.jpg',
    },
    {
      image: 'fixtures/carousel/Aq.gif',
    },
    {
      video: 'fixtures/carousel/video-carousel.MP4',
    },
  ]);

  const [firstRating, secondRating, thirdRating] = await Rating.create([
    {
      chapter: 'male',
      year: 2024,
    },
    {
      chapter: 'female',
      year: 2022,
    },
    {
      chapter: 'mixed',
      year: 2023,
    },
  ]);

  await Footer.create([
    {
      mainPartnerImage: 'fixtures/footer/kslt.svg',
      menuPosition: [
        {
          name: 'Положение КСЛТ',
          value: 'https://drive.google.com/file/d/1Cs_4fFbt9JAUV6BhOUJiDR9XjKcIp-Rd/view?usp=drive_link',
        },
        {
          name: 'Форма заявки на проведение турнира',
          value: 'https://drive.google.com/file/d/18SSA8xr6-jXdWBCI7uQoA3qogLaCQx4b/view?usp=drive_link',
        },
        {
          name: 'Таблица начисления рейтинговых очков',
          value: 'https://drive.google.com/file/d/1MtoEFnFjIZdN2eLrQES5B4JfPQiVvH7t/view?usp=drive_link',
        },
        {
          name: 'Дисциплинарное положение КСЛТ',
          value: 'https://drive.google.com/file/d/1l4xQFlxKnawHOTd3vxImCkvS34-kB3Nb/view?usp=drive_link',
        },
      ],
      publicOffer: 'https://drive.google.com/file/d/1VCqx0TwsHZxmjlSo0Qwp9DDEwVJfSUU7/view?usp=drive_link',
      socialNetwork: [
        {
          name: 'instagram',
          value: 'https://www.instagram.com/kslt_tennis.kg?igsh=M21wNXlxMmcwcDF0',
        },
        {
          name: 'facebook',
          value: 'https://www.facebook.com/share/g/KPktZiWihRcqiFHh/',
        },
        {
          name: 'telegram',
          value: 'https://t.me/+OAAcVaEu2oozNGZi',
        },
      ],
      mainLogo: [
        {
          logo: 'logo/t-club.svg',
        },
      ],
    },
  ]);

  const events = await Event.create([
    {
      rating: firstRating._id,
      category: 'Masters',
      rank: 'II',
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: 'ProMasters',
      rank: 'III',
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: 'ProMasters',
      rank: 'III',
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: 'Futures',
      rank: 'I',
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: 'Futures',
      rank: 'I',
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: 'Futures',
      rank: 'I',
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: 'ProMasters',
      rank: 'III',
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: 'Futures',
      rank: 'I',
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: 'Masters',
      rank: 'I',
      link: 'https://www.google.com',
    },
    {
      rating: thirdRating._id,
      category: 'Masters',
      rank: 'III',
      link: 'https://www.google.com',
    },
    {
      rating: thirdRating._id,
      category: 'ProMasters',
      rank: 'I',
      link: 'https://www.google.com',
    },
    {
      rating: thirdRating._id,
      category: 'ProMasters',
      rank: 'II',
      link: 'https://www.youtube.com',
    },
  ]);

  for (const rating of [firstRating, secondRating, thirdRating]) {
    const ratingEvents = events.filter((event) => event.rating.equals(rating._id));

    await Rating.findByIdAndUpdate(rating._id, {
      $push: { events: { $each: ratingEvents.map((event) => event._id) } },
    });
  }
  await db.close();
};

run().catch((err) => {
  console.log(err);
});
