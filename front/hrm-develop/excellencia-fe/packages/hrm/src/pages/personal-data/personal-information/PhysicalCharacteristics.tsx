import React, { useState, useEffect } from 'react';
import {
  FiSave,
  FiX,
  FiPlus,
  FiMinus,
  FiActivity,
  FiUser,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,

  FiTag,   // New icon for clothing sizes
} from 'react-icons/fi';

// Define the data structure for Physical Characteristics
interface PhysicalCharacteristics {
  height: {
    imperial: { feet: number | ''; inches: number | '' };
    metric: { cm: number | '' };
  };
  weight: {
    imperial: { lbs: number | '' };
    metric: { kg: number | '' };
  };
  shoeSize: {
    us: number | '';
    eu: number | '';
  };
  clothingSizes: {
    shirt: string;
    coat: string;
    trousers: string;
    hat: string;
    dress: string;
    gloves: string;
  };
  customMeasurements: {
    waist: { imperial: number | ''; metric: number | '' };
    head: { imperial: number | ''; metric: number | '' };
    neck: { imperial: number | ''; metric: number | '' };
    shoulderWidth: { imperial: number | ''; metric: number | '' };
    insideLeg: { imperial: number | ''; metric: number | '' };
    chest: { imperial: number | ''; metric: number | '' };
    sleeveLength: { imperial: number | ''; metric: number | '' };
  };
}

const CaracteristiquesPhysiques: React.FC = () => {
  const [data, setData] = useState<PhysicalCharacteristics>({
    height: { imperial: { feet: '', inches: '' }, metric: { cm: '' } },
    weight: { imperial: { lbs: '', }, metric: { kg: '', } },
    shoeSize: { us: '', eu: '', },
    clothingSizes: {
      shirt: '',
      coat: '',
      trousers: '',
      hat: '',
      dress: '',
      gloves: '',
    },
    customMeasurements: {
      waist: { imperial: '', metric: '' },
      head: { imperial: '', metric: '' },
      neck: { imperial: '', metric: '' },
      shoulderWidth: { imperial: '', metric: '' },
      insideLeg: { imperial: '', metric: '' },
      chest: { imperial: '', metric: '' },
      sleeveLength: { imperial: '', metric: '' },
    },
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showMoreSizes, setShowMoreSizes] = useState({
    shirt: false,
    coat: false,
    trousers: false,
    hat: false,
    dress: false,
    gloves: false,
  });

  // Helper function for metric/imperial conversion
  const inchesToCm = (inches: number) => inches * 2.54;
  const cmToInches = (cm: number) => cm / 2.54;
  const lbsToKg = (lbs: number) => lbs * 0.453592;
  const kgToLbs = (kg: number) => kg / 0.453592;

  // Effects for synchronizing imperial and metric values
  useEffect(() => {
    const { feet, inches } = data.height.imperial;
    if (feet !== '' || inches !== '') {
      const totalInches = (Number(feet) * 12) + Number(inches);
      const newCm = parseFloat(inchesToCm(totalInches).toFixed(1));
      setData((prev) => ({
        ...prev,
        height: { ...prev.height, metric: { cm: newCm } },
      }));
    } else if (data.height.metric.cm === 0) {
      setData((prev) => ({
        ...prev,
        height: { ...prev.height, metric: { cm: '' } },
      }));
    }
  }, [data.height.imperial.feet, data.height.imperial.inches]);

  useEffect(() => {
    const { cm } = data.height.metric;
    if (cm !== '') {
      const totalInches = cmToInches(Number(cm));
      const feet = Math.floor(totalInches / 12);
      const inches = parseFloat((totalInches % 12).toFixed(1));
      setData((prev) => ({
        ...prev,
        height: { ...prev.height, imperial: { feet, inches } },
      }));
    } else if (data.height.imperial.feet === 0 && data.height.imperial.inches === 0) {
      setData((prev) => ({
        ...prev,
        height: { ...prev.height, imperial: { feet: '', inches: '' } },
      }));
    }
  }, [data.height.metric.cm]);

  useEffect(() => {
    const { lbs } = data.weight.imperial;
    if (lbs !== '') {
      const newKg = parseFloat(lbsToKg(Number(lbs)).toFixed(1));
      setData((prev) => ({
        ...prev,
        weight: { ...prev.weight, metric: { kg: newKg } },
      }));
    } else if (data.weight.metric.kg === 0) {
      setData((prev) => ({
        ...prev,
        weight: { ...prev.weight, metric: { kg: '' } },
      }));
    }
  }, [data.weight.imperial.lbs]);

  useEffect(() => {
    const { kg } = data.weight.metric;
    if (kg !== '') {
      const newLbs = parseFloat(kgToLbs(Number(kg)).toFixed(1));
      setData((prev) => ({
        ...prev,
        weight: { ...prev.weight, imperial: { lbs: newLbs } },
      }));
    } else if (data.weight.imperial.lbs === 0) {
      setData((prev) => ({
        ...prev,
        weight: { ...prev.weight, imperial: { lbs: '' } },
      }));
    }
  }, [data.weight.metric.kg]);

  // Handle changes for custom measurements
  const handleCustomMeasurementChange = (
    measurement: keyof PhysicalCharacteristics['customMeasurements'],
    system: 'imperial' | 'metric',
    value: string
  ) => {
    let numValue = value === '' ? '' : parseFloat(value);
    if (isNaN(Number(numValue)) && numValue !== '') return;

    let updatedMeasurement = { ...data.customMeasurements[measurement] };

    if (system === 'imperial') {
      updatedMeasurement.imperial = numValue;
      if (numValue !== '') {
        updatedMeasurement.metric = parseFloat(inchesToCm(Number(numValue)).toFixed(1));
      } else {
        updatedMeasurement.metric = '';
      }
    } else {
      updatedMeasurement.metric = numValue;
      if (numValue !== '') {
        updatedMeasurement.imperial = parseFloat(cmToInches(Number(numValue)).toFixed(1));
      } else {
        updatedMeasurement.imperial = '';
      }
    }

    setData((prev) => ({
      ...prev,
      customMeasurements: {
        ...prev.customMeasurements,
        [measurement]: updatedMeasurement,
      },
    }));
  };

  const validateForm = () => {
    let errors: string[] = [];
    if (data.height.imperial.feet === '' && data.height.metric.cm === '') {
      errors.push('Height is a required field.');
    }
    if (data.weight.imperial.lbs === '' && data.weight.metric.kg === '') {
      errors.push('Weight is a required field.');
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving physical characteristics:', data);
      // Logic to save data to backend/state
      setValidationErrors([]);
      alert('Physical characteristics saved successfully!');
    } else {
      alert('Please correct the form errors before saving.');
    }
  };

  const handleClear = () => {
    setData({
      height: { imperial: { feet: '', inches: '' }, metric: { cm: '' } },
      weight: { imperial: { lbs: '', }, metric: { kg: '', } },
      shoeSize: { us: '', eu: '', },
      clothingSizes: {
        shirt: '',
        coat: '',
        trousers: '',
        hat: '',
        dress: '',
        gloves: '',
      },
      customMeasurements: {
        waist: { imperial: '', metric: '' },
        head: { imperial: '', metric: '' },
        neck: { imperial: '', metric: '' },
        shoulderWidth: { imperial: '', metric: '' },
        insideLeg: { imperial: '', metric: '' },
        chest: { imperial: '', metric: '' },
        sleeveLength: { imperial: '', metric: '' },
      },
    });
    setValidationErrors([]);
    alert('Form cleared!');
  };

  const clothingSizeOptions: Record<string, string[]> = {
    shirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    coat: ['36', '38', '40', '42', '44', '46', '48'],
    trousers: ['28', '30', '32', '34', '36', '38', '40'],
    hat: ['S', 'M', 'L', 'XL'],
    dress: ['0', '2', '4', '6', '8', '10', '12', '14'],
    gloves: ['S', 'M', 'L', 'XL'],
  };

  const renderFormInput = (label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string = '', type: string = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
      />
    </div>
  );

  const renderDualInput = (
    label: string,
    imperialValue: number | '',
    metricValue: number | '',
    onImperialChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onMetricChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    imperialUnit: string,
    metricUnit: string
  ) => (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} ({imperialUnit})
        </label>
        <input
          type="number"
          value={imperialValue}
          onChange={onImperialChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} ({metricUnit})
        </label>
        <input
          type="number"
          value={metricValue}
          onChange={onMetricChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          min="0"
        />
      </div>
    </div>
  );

  const renderClothingSizeSelector = (label: string, key: keyof PhysicalCharacteristics['clothingSizes']) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center">
        <select
          value={data.clothingSizes[key]}
          onChange={(e) => setData({
            ...data,
            clothingSizes: { ...data.clothingSizes, [key]: e.target.value }
          })}
          className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select size</option>
          {clothingSizeOptions[key].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowMoreSizes({ ...showMoreSizes, [key]: !showMoreSizes[key] })}
          className="ml-2 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          title={showMoreSizes[key] ? 'Collapse options' : 'Expand options'}
        >
          {showMoreSizes[key] ? <FiMinus /> : <FiPlus />}
        </button>
      </div>
      {showMoreSizes[key] && (
        <div className="mt-2 text-xs text-gray-500">
          * Additional sizing variations not implemented, this button is for visual representation.
        </div>
      )}
    </div>
  );


  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiActivity className="w-8 h-8 mr-4 text-orange-500" />
            Caractéristiques Physiques
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <FiSave />
              <span>Sauvegarder</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <FiX />
              <span>Annuler</span>
            </button>
          </div>
        </div>

        {validationErrors.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-3" />
              <p className="font-bold">Erreurs de validation</p>
            </div>
            <ul className="mt-2 text-sm list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form Sections */}
        <div className="space-y-8">
          {/* Section 1: Basic Measurements */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <FiAlertCircle className="w-5 h-5 mr-3 text-orange-500" />
              Mesures de base
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taille
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={data.height.imperial.feet}
                      onChange={(e) => setData({
                        ...data,
                        height: { ...data.height, imperial: { ...data.height.imperial, feet: e.target.value === '' ? '' : Number(e.target.value) } }
                      })}
                      className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Pieds"
                      min="0"
                    />
                    <input
                      type="number"
                      value={data.height.imperial.inches}
                      onChange={(e) => setData({
                        ...data,
                        height: { ...data.height, imperial: { ...data.height.imperial, inches: e.target.value === '' ? '' : Number(e.target.value) } }
                      })}
                      className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Pouces"
                      min="0"
                      max="11"
                    />
                  </div>
                  <input
                    type="number"
                    value={data.height.metric.cm}
                    onChange={(e) => setData({
                      ...data,
                      height: { ...data.height, metric: { cm: e.target.value === '' ? '' : Number(e.target.value) } }
                    })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="cm"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Pieds/Pouces (impérial) et centimètres (métrique).
                </p>
              </div>

              {/* Weight */}
              {renderDualInput(
                'Poids',
                data.weight.imperial.lbs,
                data.weight.metric.kg,
                (e) => setData({
                  ...data,
                  weight: { ...data.weight, imperial: { lbs: e.target.value === '' ? '' : Number(e.target.value) } }
                }),
                (e) => setData({
                  ...data,
                  weight: { ...data.weight, metric: { kg: e.target.value === '' ? '' : Number(e.target.value) } }
                }),
                'lbs',
                'kg'
              )}

              {/* Shoe Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pointure
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={data.shoeSize.us}
                    onChange={(e) => setData({
                      ...data,
                      shoeSize: { ...data.shoeSize, us: e.target.value === '' ? '' : Number(e.target.value) }
                    })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="US"
                    min="0"
                  />
                  <input
                    type="number"
                    value={data.shoeSize.eu}
                    onChange={(e) => setData({
                      ...data,
                      shoeSize: { ...data.shoeSize, eu: e.target.value === '' ? '' : Number(e.target.value) }
                    })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="EU"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Clothing Sizes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <FiTag className="w-5 h-5 mr-3 text-orange-500" />
              Tailles de vêtements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              {renderClothingSizeSelector('Chemise', 'shirt')}
              {renderClothingSizeSelector('Manteau', 'coat')}
              {renderClothingSizeSelector('Pantalon', 'trousers')}
              {renderClothingSizeSelector('Chapeau', 'hat')}
              {renderClothingSizeSelector('Robe', 'dress')}
              {renderClothingSizeSelector('Gants', 'gloves')}
            </div>
          </div>

          {/* Section 3: Custom Body Measurements */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center border-b pb-2">
              <FiUser className="w-5 h-5 mr-3 text-orange-500" />
              Mesures corporelles détaillées
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              {Object.entries(data.customMeasurements).map(([key, { imperial, metric }]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={imperial}
                        onChange={(e) => handleCustomMeasurementChange(key as keyof PhysicalCharacteristics['customMeasurements'], 'imperial', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                        placeholder="pouces"
                        min="0"
                      />
                      <input
                        type="number"
                        value={metric}
                        onChange={(e) => handleCustomMeasurementChange(key as keyof PhysicalCharacteristics['customMeasurements'], 'metric', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                        placeholder="cm"
                        min="0"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaracteristiquesPhysiques;