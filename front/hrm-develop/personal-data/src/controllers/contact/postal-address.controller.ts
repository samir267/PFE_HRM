import { Request, Response } from 'express';
import PostalAddressService from '../../service/contact/postal-address.service';
import { Address } from '../../types/contact/contactTypes.type';

// Interfaces pour typer les requêtes
interface AddressRequest extends Request {
  params: { employeeId: string; addressId: string };
  body: Partial<Address>;
}

const PostalAddressController = {
  createAddress: async (req: AddressRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const address = await PostalAddressService.registerAddress(employeeId, req.body);
      res.status(201).json(address);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updateAddress: async (req: AddressRequest, res: Response) => {
    try {
      const { addressId } = req.params;
      const address = await PostalAddressService.updateAddress(addressId, req.body);
      res.status(200).json(address);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getAllAddresses: async (req: Request<{ employeeId: string }>, res: Response) => {
    try {
      const { employeeId } = req.params;
      const addresses = await PostalAddressService.getAllAddresses(employeeId);
      res.status(200).json(addresses);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getAddressById: async (req: Request<{ employeeId: string; addressId: string }>, res: Response) => {
    try {
      const { addressId } = req.params;
      const address = await PostalAddressService.getAddressById(addressId);
      res.status(200).json(address);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },
};

export default PostalAddressController;