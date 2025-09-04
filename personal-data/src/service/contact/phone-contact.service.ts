import PhoneContact from '../../models/contact/phoneContact.model';
import { PhoneContact as PhoneContactType } from '../../types/contact/contactTypes.type';

const PhoneContactService = {
  registerPhoneContact: async (employeeId: string, phoneData: Partial<PhoneContactType>): Promise<PhoneContactType> => {
    const phone = new PhoneContact({ ...phoneData, personalIdentityId: employeeId });
    await phone.save();
    return phone;
  },

  updatePhoneContact: async (phoneId: string, phoneData: Partial<PhoneContactType>): Promise<PhoneContactType> => {
    const phone = await PhoneContact.findByIdAndUpdate(phoneId, phoneData, { new: true });
    if (!phone) throw new Error('Phone contact not found');
    return phone;
  },

  getAllPhoneContacts: async (employeeId: string): Promise<PhoneContactType[]> => {
    const phones = await PhoneContact.find({ personalIdentityId: employeeId });
    return phones;
  },

  getPhonesByUserId:async(personalIdentityId: string):Promise<PhoneContactType[]>=>{
    const phoneContacts=await PhoneContact.find({personalIdentityId:personalIdentityId});
    return phoneContacts
  }
};

export default PhoneContactService;