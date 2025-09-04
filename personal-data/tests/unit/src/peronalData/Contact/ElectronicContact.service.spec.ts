import ElectronicContactService from '../../../../../src/service/contact/electronic-contact.service';
import ElectronicContact from '../../../../../src/models/contact/ElectronicContact.model';
import { ElectronicContactType } from '../../../../../src/types/contact/contactTypes.type';

jest.mock('../../../../../src/models/contact/ElectronicContact.model');

describe('ElectronicContactService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new electronic contact', async () => {
    const fakeId = '68879d55fa57c3c887ab67b2';
    const mockData = {
      contactValue: 'test@example.com',
      contactType: ElectronicContactType.EMAIL,
      isActive: true,
    };

    const savedContact = {
      _id: 'mocked_id',
      personalIdentityId: fakeId,
      contactValue: mockData.contactValue,
      contactType: mockData.contactType,
      isActive: true,
    };

    const mockSave = jest.fn().mockResolvedValue(savedContact);

    // On mocke le constructeur pour qu'il retourne un objet avec save()
    (ElectronicContact as unknown as jest.Mock).mockImplementation(() => ({
      ...savedContact,
      save: mockSave,
    }));

    const result = await ElectronicContactService.setElectronicContact(fakeId, mockData);

    expect(ElectronicContact).toHaveBeenCalledWith({
      ...mockData,
      personalIdentityId: fakeId,
    });
    expect(mockSave).toHaveBeenCalled();
    expect(result.personalIdentityId).toBe(fakeId);
    expect(result.contactValue).toBe(mockData.contactValue);
  });
});
