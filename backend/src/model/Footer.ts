import mongoose from 'mongoose';
import { FooterFields, LinksMediaFields } from '../types/footer';

const SocialNetworkSchema = new mongoose.Schema<LinksMediaFields>({
  name: {
    type: String,
    required: [true, 'Поле иконки обязательно!'],
  },
  isMail: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    required: [true, 'Поле ссылка обязательно!'],
  },
});

const MenuPositionSchema = new mongoose.Schema<LinksMediaFields>({
  name: {
    type: String,
    required: [true, 'Поле название обязательно!'],
  },
  value: {
    type: String,
    required: [true, 'Поле ссылка обязательно!'],
  },
});

const FooterSchema = new mongoose.Schema<FooterFields>({
  socialNetwork: {
    type: [SocialNetworkSchema],
  },
  menuPosition: {
    type: [MenuPositionSchema],
  },
  publicOffer: {
    type: String,
    required: [true, 'Поле публичная оферта обязательно!'],
    default: 'https://drive.google.com/file/d/1VCqx0TwsHZxmjlSo0Qwp9DDEwVJfSUU7/view?usp=drive_link',
  },
  mainPartnerImage: {
    type: String,
    required: [true, 'Поле главный партнер обязательно!'],
    default: 'fixtures/footer/kslt.svg',
  },
});

FooterSchema.set('validateBeforeSave', false);

const Footer = mongoose.model('Footer', FooterSchema);
export default Footer;
