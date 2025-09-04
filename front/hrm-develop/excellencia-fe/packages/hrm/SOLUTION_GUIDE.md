# Solution pour l'erreur 500 - PersonalInformation

## Problème résolu

L'erreur 500 que vous rencontriez était due à une incompatibilité entre la structure de données envoyée par votre frontend et celle attendue par votre backend. Votre backend attend une structure spécifique (comme celle que vous avez testée avec Postman), mais votre frontend envoyait une structure différente.

## Solution implémentée

### 1. Modification du composant PersonalInformation.tsx

J'ai modifié la fonction `handleNext` dans votre composant pour utiliser le service `personalDataService` au lieu de l'appel direct à l'API :

```typescript
// AVANT (causait l'erreur 500)
const response = await fetch('http://localhost:4000/api/employeeInformation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(personalInformationData),
});

// APRÈS (utilise le service avec transformation de données)
const response = await personalDataService.createEmployeeInformation(personalInformationData);
```

### 2. Ajout de la méthode createEmployeeInformation avec transformation

J'ai ajouté une nouvelle méthode `createEmployeeInformation` dans le service `personalDataService` qui :

- **Reçoit** les données monolithiques du frontend
- **Transforme** automatiquement la structure pour correspondre à celle attendue par le backend
- **Envoie** les données transformées à l'endpoint `/api/employeeInformation`

### 3. Transformation des données

La méthode `transformFrontendToBackend` convertit automatiquement :

#### Données de base :
- `title`: "Mr." → "MR"
- `gender`: "Male" → "MALE"
- `accountType`: "Checking" → "CHECKING"

#### Structures complexes :
- **Citoyennetés** : `[{countryCode: "USA", primaryNationality: true}]` → `["USA"]`
- **Historique marital** : `[{status: "Single", effectiveDate: "2020-01-01"}]` → `[{status: "SINGLE", from: "2020-01-01"}]`
- **Membres de famille** : `[{firstName: "John", lastName: "Doe", relationship: "Spouse"}]` → `[{name: "John Doe", relation: "Spouse"}]`
- **Contacts d'urgence** : `[{firstName: "Jane", lastName: "Doe", phone: "123456789"}]` → `[{name: "Jane Doe", phone: "123456789", relation: "Emergency Contact"}]`

### 4. Correction de l'erreur "process is not defined"

**Problème** : L'erreur `process is not defined` se produit car Vite utilise `import.meta.env` au lieu de `process.env` pour les variables d'environnement.

**Solution** : J'ai corrigé le fichier `api.ts` pour utiliser les URLs directement :

```typescript
// AVANT (causait l'erreur)
const API_CONFIG = {
  PERSONAL_DATA: process.env.REACT_APP_PERSONAL_DATA_API || 'http://localhost:3001',
  // ...
};

// APRÈS (corrigé)
const API_CONFIG = {
  PERSONAL_DATA: 'http://localhost:4000',
  HIRING_EMPLOYEE: 'http://localhost:3001',
  AUTH: 'http://localhost:3000'
};
```

### 5. Configuration des URLs d'API

Les URLs sont maintenant configurées directement dans le code pour éviter les problèmes de variables d'environnement :

```typescript
const API_CONFIG = {
  PERSONAL_DATA: 'http://localhost:4000',  // Votre backend personal-data
  HIRING_EMPLOYEE: 'http://localhost:3001', // Votre backend hiring-employee
  AUTH: 'http://localhost:3000'            // Votre backend auth
};
```

## Comment tester la solution

### 1. Démarrer l'application
```bash
cd front/hrm-develop/excellencia-fe/packages/hrm
npm run dev
```

### 2. Tester le formulaire
1. Allez sur `http://localhost:3002/personal-data/personal-information`
2. Remplissez le formulaire avec des données de test
3. Cliquez sur "Submit"
4. Vérifiez que vous ne recevez plus l'erreur 500

### 3. Vérifier les données dans le backend
Vous pouvez vérifier que les données ont été créées en consultant l'endpoint :
- `http://localhost:4000/api/employeeInformation`

## Exemple de transformation

### Données envoyées par le frontend :
```javascript
{
  title: 'Mr.',
  firstName: 'a',
  lastName: 'a',
  gender: 'Male',
  citizenships: [{countryCode: 'USA', primaryNationality: true}],
  emergencyContacts: [{firstName: 'John', lastName: 'Doe', phone: '123456789'}],
  bankAccount: {accountType: 'Checking'}
}
```

### Données transformées pour le backend :
```javascript
{
  title: 'MR',
  firstName: 'a',
  lastName: 'a',
  gender: 'MALE',
  citizenships: ['USA'],
  emergencyContacts: [{name: 'John Doe', phone: '123456789', relation: 'Emergency Contact'}],
  bankAccount: {accountType: 'CHECKING'}
}
```

## Avantages de cette solution

1. **Compatibilité** : Votre composant existant continue de fonctionner sans modification majeure
2. **Transformation automatique** : Les données sont automatiquement adaptées au format attendu par le backend
3. **Robustesse** : Gestion des valeurs manquantes et transformation sécurisée
4. **Maintenabilité** : La logique de transformation est centralisée dans le service
5. **Pas de problèmes d'environnement** : Les URLs sont configurées directement

## Prochaines étapes recommandées

1. **Tester** : Vérifiez que le formulaire fonctionne correctement
2. **Optimiser** : Considérez l'utilisation des hooks personnalisés (`usePersonalData`) pour une meilleure gestion d'état
3. **Adapter** : Appliquez la même approche aux autres composants qui utilisent des endpoints monolithiques

## Support

Si vous rencontrez encore des problèmes :
1. Vérifiez que votre backend est démarré sur le port 4000
2. Vérifiez les logs du backend pour des erreurs spécifiques
3. Utilisez les outils de développement du navigateur pour voir les appels réseau
4. Vérifiez que la structure des données transformées correspond exactement à celle attendue par votre backend
