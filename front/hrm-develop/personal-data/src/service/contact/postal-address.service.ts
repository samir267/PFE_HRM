import PostalAddress from '../../models/contact/postalAddress.model';
import { Address } from '../../types/contact/contactTypes.type';

const PostalAddressService = {
  registerAddress: async (employeeId: string, addressData: Partial<Address>): Promise<Address> => {
    const address = new PostalAddress({ ...addressData, personalIdentityId: employeeId });
    await address.save();
    return address;
  },

  updateAddress: async (addressId: string, addressData: Partial<Address>): Promise<Address> => {
    const address = await PostalAddress.findByIdAndUpdate(addressId, addressData, { new: true });
    if (!address) throw new Error('Address not found');
    return address;
  },

  getAllAddresses: async (employeeId: string): Promise<Address[]> => {
    const addresses = await PostalAddress.find({ personalIdentityId: employeeId });
    return addresses;
  },

  getAddressById: async (addressId: string): Promise<Address> => {
    const address = await PostalAddress.findById(addressId);
    if (!address) throw new Error('Address not found');
    return address;
  },
};

export default PostalAddressService;