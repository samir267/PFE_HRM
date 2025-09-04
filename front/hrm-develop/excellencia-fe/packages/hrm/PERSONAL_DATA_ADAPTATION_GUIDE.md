# Guide d'Adaptation des Composants de Données Personnelles

## Vue d'ensemble

Ce guide détaille comment adapter vos composants frontend de données personnelles pour qu'ils fonctionnent avec votre backend sans casser les fonctionnalités existantes.

## Architecture de l'Adaptation

### 1. Service API Unifié ✅
- **Fichier** : `src/services/personalData.service.ts`
- **Fonction** : Interface avec tous les endpoints backend existants
- **Endpoints supportés** :
  - Identités personnelles
  - Informations de naissance
  - Nationalités
  - Adresses postales
  - Contacts téléphoniques
  - Contacts d'urgence
  - Situations familiales
  - Comptes bancaires

### 2. Hooks Personnalisés ✅
- **Fichier** : `src/hooks/usePersonalData.ts`
- **Fonction** : Abstraction des appels API avec gestion d'état
- **Hooks disponibles** :
  - `useEmployeePersonalData`
  - `useEmployeeAddresses`
  - `useEmployeePhoneContacts`
  - `useEmployeeEmergencyContacts`
  - `useEmployeeFamilySituation`
  - `useEmployeeBankAccounts`
  - `useEmployeePersonalIdentity`

### 3. Composant Adapté ✅
- **Fichier** : `src/pages/personal-data/personal-information/PersonalInformationAdapted.tsx`
- **Fonction** : Exemple d'adaptation du composant existant

## Étapes d'Adaptation

### Étape 1 : Configuration de l'Environnement

1. **Créer le fichier `.env`** :
```bash
cd front/hrm-develop/excellencia-fe/packages/hrm
cp env.example .env
```

2. **Configurer les URLs** :
```env
REACT_APP_PERSONAL_DATA_API=http://localhost:3001
REACT_APP_HIRING_EMPLOYEE_API=http://localhost:3002
REACT_APP_AUTH_API=http://localhost:3000
```

### Étape 2 : Installation des Dépendances

```bash
npm install axios
```

### Étape 3 : Adaptation des Composants Existants

#### 3.1 Adapter PersonalInformation.tsx

**Avant** (données statiques) :
```typescript
const [employeeData, setEmployeeData] = useState<EmployeeInformation>({
  // Données statiques
});
```

**Après** (données du backend) :
```typescript
import { useEmployeePersonalData, useEmployeePersonalIdentity, useEmployeeAddresses } from '../../../hooks/usePersonalData';

const PersonalInformation: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  const { employee, loading: employeeLoading, error: employeeError, updateEmployee } = useEmployeePersonalData(employeeId);
  const { personalIdentity, birthInformation, nationalities, loading: identityLoading, error: identityError, updatePersonalIdentity } = useEmployeePersonalIdentity(employeeId);
  const { addresses, loading: addressesLoading, error: addressesError, createAddress, updateAddress } = useEmployeeAddresses(employeeId);
  
  // Convertir les données du backend vers le format du frontend
  const [employeeData, setEmployeeData] = useState<EmployeeInformation>({/*...*/});
  
  useEffect(() => {
    if (personalIdentity && birthInformation) {
      const convertedData = convertBackendToFrontend(
        personalIdentity,
        birthInformation,
        nationalities,
        addresses || [],
        // ... autres données
      );
      setEmployeeData(convertedData);
    }
  }, [personalIdentity, birthInformation, nationalities, addresses]);

  // Gestion des erreurs et du chargement
  const loading = employeeLoading || identityLoading || addressesLoading;
  const error = employeeError || identityError || addressesError;

  if (error) {
    return <div className="error-message">Erreur : {error}</div>;
  }

  if (loading) {
    return <div className="loading-spinner">Chargement...</div>;
  }

  // Reste du composant inchangé
};
```

#### 3.2 Adapter Adresse.tsx

```typescript
import { useEmployeeAddresses } from '../../../hooks/usePersonalData';

const Adresse: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  const { addresses, loading, error, createAddress, updateAddress } = useEmployeeAddresses(employeeId);

  const handleSaveAddress = async (addressData: any) => {
    const response = await createAddress({
      employeeId: employeeId!,
      addressType: 'home',
      ...addressData,
      isPrimary: true
    });
    
    if (response.success) {
      // Notification de succès
    } else {
      // Gestion d'erreur
    }
  };

  return (
    <div>
      {loading && <div>Chargement des adresses...</div>}
      {error && <div>Erreur : {error}</div>}
      {addresses?.map(address => (
        <div key={address.id}>
          {/* Affichage de l'adresse */}
        </div>
      ))}
      {/* Formulaire d'ajout/modification */}
    </div>
  );
};
```

#### 3.3 Adapter PhoneFax.tsx

```typescript
import { useEmployeePhoneContacts } from '../../../hooks/usePersonalData';

const PhoneFax: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  const { phoneContacts, loading, error, createPhoneContact, updatePhoneContact } = useEmployeePhoneContacts(employeeId);

  const handleSavePhone = async (phoneData: any) => {
    const response = await createPhoneContact({
      employeeId: employeeId!,
      phoneType: 'mobile',
      phoneNumber: phoneData.phoneNumber,
      isPrimary: true,
      isActive: true
    });
    
    if (response.success) {
      // Notification de succès
    }
  };

  return (
    <div>
      {loading && <div>Chargement des contacts...</div>}
      {error && <div>Erreur : {error}</div>}
      {phoneContacts?.map(contact => (
        <div key={contact.id}>
          {/* Affichage du contact */}
        </div>
      ))}
      {/* Formulaire d'ajout/modification */}
    </div>
  );
};
```

#### 3.4 Adapter BankDetailsPayment.tsx

```typescript
import { useEmployeeBankAccounts } from '../../../hooks/usePersonalData';

const BankDetailsPayment: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  const { bankAccounts, loading, error, createBankAccount, updateBankAccount } = useEmployeeBankAccounts(employeeId);

  const handleSaveBankAccount = async (bankData: any) => {
    const response = await createBankAccount({
      employeeId: employeeId!,
      ...bankData,
      isActive: true
    });
    
    if (response.success) {
      // Notification de succès
    }
  };

  return (
    <div>
      {loading && <div>Chargement des comptes bancaires...</div>}
      {error && <div>Erreur : {error}</div>}
      {bankAccounts?.map(account => (
        <div key={account.id}>
          {/* Affichage du compte */}
        </div>
      ))}
      {/* Formulaire d'ajout/modification */}
    </div>
  );
};
```

### Étape 4 : Fonctions de Conversion

#### 4.1 Conversion Backend → Frontend

```typescript
const convertBackendToFrontend = (
  personalIdentity: PersonalIdentity | null,
  birthInformation: BirthInformation | null,
  nationalities: Nationality[],
  addresses: PostalAddress[],
  phoneContacts: PhoneContact[],
  // ... autres données
): EmployeeInformation => {
  return {
    title: personalIdentity?.title || '',
    firstName: personalIdentity?.firstName || '',
    lastName: personalIdentity?.lastName || '',
    gender: personalIdentity?.gender || '',
    birthDate: personalIdentity?.birthDate || '',
    cityOfBirth: birthInformation?.placeOfBirth || '',
    countryOfBirth: birthInformation?.countryOfBirthCode || '',
    mobilePhone: phoneContacts.find(phone => phone.phoneType === 'mobile')?.phoneNumber || '',
    workPhone: phoneContacts.find(phone => phone.phoneType === 'work')?.phoneNumber || '',
    homeAddress: {
      street1: addresses.find(addr => addr.addressType === 'home')?.street1 || '',
      street2: addresses.find(addr => addr.addressType === 'home')?.street2 || '',
      city: addresses.find(addr => addr.addressType === 'home')?.city || '',
      stateProvince: addresses.find(addr => addr.addressType === 'home')?.stateProvince || '',
      postalCode: addresses.find(addr => addr.addressType === 'home')?.postalCode || '',
      country: addresses.find(addr => addr.addressType === 'home')?.country || '',
    },
    // ... autres conversions
  };
};
```

#### 4.2 Conversion Frontend → Backend

```typescript
const convertFrontendToBackend = (employeeData: EmployeeInformation) => {
  return {
    personalIdentity: {
      title: employeeData.title,
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      gender: employeeData.gender,
      birthDate: employeeData.birthDate,
      // ... autres champs
    },
    birthInformation: {
      placeOfBirth: employeeData.cityOfBirth,
      countryOfBirthCode: employeeData.countryOfBirth,
      county: employeeData.county
    },
    // ... autres conversions
  };
};
```

### Étape 5 : Gestion des Erreurs et du Chargement

```typescript
// Hook personnalisé pour la gestion globale
const usePersonalDataLoading = (employeeId?: string) => {
  const { loading: employeeLoading, error: employeeError } = useEmployeePersonalData(employeeId);
  const { loading: identityLoading, error: identityError } = useEmployeePersonalIdentity(employeeId);
  const { loading: addressesLoading, error: addressesError } = useEmployeeAddresses(employeeId);
  // ... autres hooks

  const loading = employeeLoading || identityLoading || addressesLoading;
  const error = employeeError || identityError || addressesError;

  return { loading, error };
};

// Utilisation dans les composants
const MyComponent: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  const { loading, error } = usePersonalDataLoading(employeeId);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Erreur :</strong> {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    // Contenu du composant
  );
};
```

### Étape 6 : Sauvegarde des Données

```typescript
const handleSave = async () => {
  setIsLoading(true);
  try {
    // Convertir les données du frontend vers le format du backend
    const backendData = convertFrontendToBackend(employeeData);
    
    // Mettre à jour l'identité personnelle
    if (personalIdentity?.id) {
      await updatePersonalIdentity(backendData.personalIdentity);
      await updateBirthInformation(backendData.birthInformation);
    }

    // Mettre à jour les adresses
    if (employeeData.homeAddress.street1) {
      const homeAddressData = {
        employeeId: employeeId!,
        addressType: 'home' as const,
        ...employeeData.homeAddress,
        isPrimary: true
      };
      await createAddress(homeAddressData);
    }

    // Mettre à jour les contacts téléphoniques
    if (employeeData.mobilePhone) {
      const mobilePhoneData = {
        employeeId: employeeId!,
        phoneType: 'mobile' as const,
        phoneNumber: employeeData.mobilePhone,
        isPrimary: true,
        isActive: true
      };
      await createPhoneContact(mobilePhoneData);
    }

    // Notification de succès
    setModalMessage('Données sauvegardées avec succès !');
    setShowModal(true);
  } catch (err: any) {
    setModalMessage(`Erreur lors de la sauvegarde: ${err.message}`);
    setShowModal(true);
  } finally {
    setIsLoading(false);
  }
};
```

## Endpoints Backend Disponibles

### Identités Personnelles
- `GET /personal-identity/:id` - Récupérer une identité
- `PATCH /personal-identity/:id` - Mettre à jour une identité
- `GET /personal-identities` - Récupérer toutes les identités

### Informations de Naissance
- `GET /birth-information/:personalIdentityId` - Récupérer les infos de naissance
- `PATCH /birth-information/:personalIdentityId` - Mettre à jour les infos de naissance

### Nationalités
- `POST /nationalities` - Créer des nationalités

### Adresses
- `POST /employees/:employeeId/addresses` - Créer une adresse
- `GET /employees/:employeeId/addresses` - Récupérer les adresses
- `PUT /employees/:employeeId/addresses/:addressId` - Mettre à jour une adresse

### Contacts Téléphoniques
- `POST /employees/:employeeId/phones` - Créer un contact téléphonique
- `GET /employees/:employeeId/phones` - Récupérer les contacts téléphoniques
- `PUT /employees/:employeeId/phones/:phoneId` - Mettre à jour un contact

### Contacts d'Urgence
- `POST /employees/:employeeId/emergency-contacts` - Créer un contact d'urgence
- `PUT /employees/:employeeId/emergency-contacts/:contactId` - Mettre à jour un contact

### Situations Familiales
- `POST /marital-status` - Créer un statut marital
- `GET /marital-status/employee/:employeeId` - Récupérer les statuts maritaux
- `POST /dependant` - Créer un dépendant
- `GET /dependant/employee/:employeeId` - Récupérer les dépendants

## Endpoints à Implémenter dans le Backend

### Comptes Bancaires
```typescript
// À ajouter dans personal-data/src/routes/
router.post('/bank-accounts', BankAccountController.createBankAccount);
router.get('/bank-accounts/employee/:employeeId', BankAccountController.getEmployeeBankAccounts);
router.put('/bank-accounts/:accountId', BankAccountController.updateBankAccount);
router.delete('/bank-accounts/:accountId', BankAccountController.deleteBankAccount);
```

### Documents
```typescript
// À ajouter dans personal-data/src/routes/
router.post('/documents/upload', DocumentController.uploadDocument);
router.get('/documents/employee/:employeeId', DocumentController.getEmployeeDocuments);
router.delete('/documents/:documentId', DocumentController.deleteDocument);
```

### Équipements
```typescript
// À ajouter dans personal-data/src/routes/
router.post('/equipment/assign', EquipmentController.assignEquipment);
router.get('/equipment/employee/:employeeId', EquipmentController.getEmployeeEquipment);
router.put('/equipment/:equipmentId/return', EquipmentController.returnEquipment);
```

### Dépenses Médicales
```typescript
// À ajouter dans personal-data/src/routes/
router.post('/medical-expenses', MedicalExpenseController.createMedicalExpense);
router.get('/medical-expenses/employee/:employeeId', MedicalExpenseController.getEmployeeMedicalExpenses);
router.put('/medical-expenses/:expenseId', MedicalExpenseController.updateMedicalExpense);
router.delete('/medical-expenses/:expenseId', MedicalExpenseController.deleteMedicalExpense);
```

## Tests et Validation

### 1. Test des Hooks

```typescript
// src/hooks/__tests__/usePersonalData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useEmployeePersonalData } from '../usePersonalData';

describe('useEmployeePersonalData', () => {
  it('should fetch employee data', async () => {
    const { result } = renderHook(() => useEmployeePersonalData('test-employee-id'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.employee).toBeDefined();
  });
});
```

### 2. Test des Composants

```typescript
// src/pages/personal-data/__tests__/PersonalInformationAdapted.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import PersonalInformationAdapted from '../personal-information/PersonalInformationAdapted';

jest.mock('../../../hooks/usePersonalData');

test('renders personal information form', async () => {
  render(<PersonalInformationAdapted employeeId="test-id" />);
  
  await waitFor(() => {
    expect(screen.getByText('Informations Personnelles')).toBeInTheDocument();
  });
});
```

## Migration des Données Existantes

Si vous avez des données existantes dans le frontend, vous devrez :

1. **Créer un script de migration** pour convertir les données statiques en appels API
2. **Tester la migration** avec un petit ensemble de données
3. **Valider l'intégrité** des données après migration
4. **Mettre à jour les composants** progressivement

## Déploiement

### 1. Variables d'Environnement de Production

```env
REACT_APP_PERSONAL_DATA_API=https://api-personal-data.yourdomain.com
REACT_APP_HIRING_EMPLOYEE_API=https://api-hiring-employee.yourdomain.com
REACT_APP_AUTH_API=https://api-auth.yourdomain.com
```

### 2. Configuration CORS

Assurez-vous que votre backend autorise les requêtes du frontend :

```typescript
// Dans personal-data/src/app.ts
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3002',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

## Conclusion

Cette adaptation permet de :

1. **Conserver toutes les fonctionnalités existantes** du frontend
2. **Intégrer progressivement** les appels API backend
3. **Maintenir une architecture propre** avec séparation des responsabilités
4. **Faciliter les tests** et la maintenance
5. **Permettre une migration en douceur** sans interruption de service

Les composants existants peuvent être adaptés un par un, en commençant par les plus simples, puis en progressant vers les plus complexes.


