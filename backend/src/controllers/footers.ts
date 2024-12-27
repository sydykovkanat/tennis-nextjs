import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Footer from '../model/Footer';
import { clearImages } from '../utils/multer';
import {LogoFields} from "../types/footer";

export const getFooterItems = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const footerData = await Footer.find().lean();

    return res.send(footerData);
  } catch (error) {
    return next(error);
  }
};

export const createFooterSocialNetwork = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, value } = req.body;

    if (!name || !value) {
      return res.status(400).send({ error: 'Fields name and value are required!' });
    }

    let footerSocialNetwork;

    footerSocialNetwork = await Footer.findOneAndUpdate(
      {},
      { $push: { socialNetwork: { name, value } } },
      { new: true, upsert: true }
    );

    footerSocialNetwork = await Footer.updateOne(
      { 'socialNetwork.name': 'email' },
      { $set: { 'socialNetwork.$.isMail': true } }
    );

    return res.send(footerSocialNetwork);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};

export const getOneFooterSocialNetwork = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const getOneSocialNetwork = await Footer.findOne({ 'socialNetwork._id': id }, { 'socialNetwork.$': 1, '-_id': 0 });

    if (!getOneSocialNetwork) {
      return res.status(404).send({ message: 'Social network not found!' });
    }

    return res.send(getOneSocialNetwork);
  } catch (error) {
    return next(error);
  }
};

export const updateFooterSocialNetwork = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { name, value } = req.body;

    if (!name || !value) {
      return res.status(400).send({ error: 'Fields name and value are required!' });
    }

    const updateFooterSocialNetwork = await Footer.findOneAndUpdate(
      { 'socialNetwork._id': id },
      { $set: { 'socialNetwork.$.name': name, 'socialNetwork.$.value': value } },
      { new: true }
    );

    if (!updateFooterSocialNetwork) {
      return res.status(404).send({ message: 'Social network not found!' });
    }

    return res.send(updateFooterSocialNetwork);
  } catch (error) {
    return next(error);
  }
};

export const deleteOneFooterSocialNetwork = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const deleteOneSocialNetwork = await Footer.findOneAndUpdate(
      { 'socialNetwork._id': id },
      { $pull: { socialNetwork: { _id: id } } },
      { new: true }
    );

    if (!deleteOneSocialNetwork) {
      return res.status(404).send({ message: 'Social network not found!' });
    }

    return res.status(200).send(deleteOneSocialNetwork);
  } catch (error) {
    return next(error);
  }
};

export const createFooterMenuPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, value } = req.body;

    if (!name || !value) {
      return res.status(400).send({ error: 'Fields name and value are required!' });
    }

    const footerMenuPosition = await Footer.findOneAndUpdate(
      {},
      { $push: { menuPosition: { name, value } } },
      { new: true, upsert: true }
    );

    return res.send(footerMenuPosition);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};

export const getOneFooterMenuPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const getOneMenuPosition = await Footer.findOne({ 'menuPosition._id': id }, { 'menuPosition.$': 1, '-_id': 0 });

    if (!getOneMenuPosition) {
      return res.status(404).send({ message: 'Menu item not found!' });
    }

    return res.send(getOneMenuPosition);
  } catch (error) {
    return next(error);
  }
};

export const updateFooterMenuPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { name, value } = req.body;

    if (!name || !value) {
      return res.status(400).send({ error: 'Fields name and value are required!' });
    }

    const updateFooterMenuPosition = await Footer.findOneAndUpdate(
      { 'menuPosition._id': id },
      { $set: { 'menuPosition.$.name': name, 'menuPosition.$.value': value } },
      { new: true }
    );

    if (!updateFooterMenuPosition) {
      return res.status(404).send({ message: 'Menu item not found!' });
    }

    return res.send(updateFooterMenuPosition);
  } catch (error) {
    return next(error);
  }
};

export const deleteOneFooterMenuPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const deleteOneMenuPosition = await Footer.findOneAndUpdate(
      { 'menuPosition._id': id },
      { $pull: { menuPosition: { _id: id } } },
      { new: true }
    );

    if (!deleteOneMenuPosition) {
      return res.status(404).send({ message: 'Menu item not found!' });
    }

    return res.status(200).send(deleteOneMenuPosition);
  } catch (error) {
    return next(error);
  }
};

export const updatePublicOffer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { publicOfferLink } = req.body;

    if (!publicOfferLink) {
      return res.status(400).send({ error: 'PublicOfferLink are required!' });
    }

    const updatedPublicOfferLink = await Footer.findOneAndUpdate({}, { publicOffer: publicOfferLink }, { new: true });

    if (!updatedPublicOfferLink) {
      return res.status(404).send({ message: 'Update link not found!' });
    }

    return res.send(updatedPublicOfferLink);
  } catch (error) {
    return next(error);
  }
};

export const updateMainPartnerImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imagePath = req.file ? req.file.filename : null;

    if (!imagePath) {
      return res.status(400).send({ error: 'MainPartner image is required!' });
    }

    const footer = await Footer.findOne({});
    const oldImagePath = footer?.mainPartnerImage;

    if (oldImagePath) {
      clearImages(oldImagePath);
    }

    const updatedMainPartnerImageLink = await Footer.findOneAndUpdate(
      {},
      { mainPartnerImage: imagePath },
      { new: true }
    );

    if (!updatedMainPartnerImageLink) {
      return res.status(404).send({ message: 'Update image link not found!' });
    }

    return res.send(updatedMainPartnerImageLink);
  } catch (error) {
    return next(error);
  }
};


export const createMainLogo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logo = req.file ? req.file.filename : null;

    if (!logo) {
      return res.status(400).send({ error: 'Field logo is required!' });
    }

    const mainLogo = await Footer.findOneAndUpdate(
        {},
        { $push: { mainLogo: { logo } } },
        { new: true, upsert: true }
    );

    return res.send(mainLogo);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};
