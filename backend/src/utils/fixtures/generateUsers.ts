import { randomUUID } from 'crypto';
import { User } from '../../model/User';
import { Category } from '../../types/category';

export const generateUsers = async (masters: Category, proMasters: Category, futures: Category) => {
  const categories = [
    { _id: masters._id, name: masters.name },
    { _id: proMasters._id, name: proMasters.name },
    { _id: futures._id, name: futures.name },
  ];

  const generateRandomPhoneNumber = () => `099${Math.floor(1000000 + Math.random() * 9000000)}`;
  const generateRandomDateOfBirth = () => {
    const start = new Date(1960, 0, 1);
    const end = new Date(2005, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  };

  const users = Array.from({ length: 20 }, (_, index) => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return {
      category: randomCategory._id,
      fullName: `User ${index + 1}`,
      telephone: generateRandomPhoneNumber(),
      dateOfBirth: generateRandomDateOfBirth(),
      gender: ['male', 'female'][Math.floor(Math.random() * 2)],
      password: `password${index + 1}`,
      email: `user${index + 1}@example.com`,
      token: randomUUID(),
    };
  });

  await User.insertMany(users);
};
