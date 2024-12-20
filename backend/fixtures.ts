import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import config from './config';
import { News } from './src/model/News';
import { Partner } from './src/model/Partner';
import { Category } from './src/model/Category';
import { Rating } from './src/model/Rating';
import { User } from './src/model/User';
import { Event } from './src/model/Event';
import { Carousel } from './src/model/Carousel';
import { newsFixtures } from './src/utils/fixtures/newsFixtures';
import { RatingMember } from './src/model/RatingMember';
import Footer from './src/model/Footer';
import { Tournament } from './src/model/Tournament';
import { tournamentsFixtures } from './src/utils/fixtures/tournamentsFixtures';
import { mainRatingsFixtures } from './src/utils/fixtures/mainRatingsFixtures';
import { generateUsers } from './src/utils/fixtures/generateUsers';

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

  await User.create(
    {
      category: masters._id,
      fullName: 'John Doe',
      telephone: '0555 555 555',
      dateOfBirth: '15.10.2007',
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
      dateOfBirth: '15.12.2004',
      gender: 'female',
      password: '123qwe',
      email: 'alice@gmail.com',
      token: randomUUID(),
    }
  );

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
      month: 'january',
      year: 2024,
    },
    {
      chapter: 'female',
      month: 'november',
      year: 2022,
    },
    {
      chapter: 'mixed',
      month: 'april',
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
    },
  ]);

  const events = await Event.create([
    {
      rating: firstRating._id,
      category: masters._id,
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: proMasters._id,
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: proMasters._id,
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: futures._id,
      link: 'https://www.google.com',
    },
    {
      rating: firstRating._id,
      category: masters._id,
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: masters._id,
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: proMasters._id,
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: futures._id,
      link: 'https://www.google.com',
    },
    {
      rating: secondRating._id,
      category: masters._id,
      link: 'https://www.google.com',
    },
    {
      rating: thirdRating._id,
      category: masters._id,
      link: 'https://www.google.com',
    },
    {
      rating: thirdRating._id,
      category: proMasters._id,
      link: 'https://www.google.com',
    },
    {
      rating: thirdRating._id,
      category: futures._id,
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
