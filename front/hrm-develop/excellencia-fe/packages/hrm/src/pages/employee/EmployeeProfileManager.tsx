
import React, { useState } from 'react';
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiX,
  FiChevronDown,
  FiEye,
  FiPlus,
  FiInfo,
  FiSearch,
  FiCheck,
  FiTrash2,
  FiSun,
  FiMoon
} from 'react-icons/fi';

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface PeriodSchedule {
  enabled: boolean;
  start: string;
  end: string;
}

interface DailySchedule {
  am: PeriodSchedule;
  pm: PeriodSchedule;
}

type ScheduleDataType = Record<DayOfWeek, DailySchedule>;

const EmployeeProfileManager = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');
  const [userRole, setUserRole] = useState('Administrator');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Tunisia');
  const [selectedRegion, setSelectedRegion] = useState('Tunis');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
   
  const [formData, setFormData] = useState({
    firstName: 'SLIMANI',
    lastName: 'Marouen',
    email: 'contact.marouen.slimani@gmail.com',
    department: 'PITHOS GLOBAL TECHNOLOGY',
    approver: 'Department Manager',
    employmentStartDate: '',
    dateOfBirth: '',
    jobTitle: '',
    payrollId: '',
    phone: '',
    address: '',
    emergencyContact: ''
  });

  const [scheduleData, setScheduleData] = useState<ScheduleDataType>({
    Monday: { am: { enabled: true, start: '09:00', end: '12:00' }, pm: { enabled: true, start: '13:00', end: '17:00' } },
    Tuesday: { am: { enabled: true, start: '09:00', end: '12:00' }, pm: { enabled: true, start: '13:00', end: '17:00' } },
    Wednesday: { am: { enabled: true, start: '09:00', end: '12:00' }, pm: { enabled: true, start: '13:00', end: '17:00' } },
    Thursday: { am: { enabled: true, start: '09:00', end: '12:00' }, pm: { enabled: true, start: '13:00', end: '17:00' } },
    Friday: { am: { enabled: true, start: '09:00', end: '12:00' }, pm: { enabled: true, start: '13:00', end: '17:00' } },
    Saturday: { am: { enabled: false, start: '09:00', end: '12:00' }, pm: { enabled: false, start: '13:00', end: '17:00' } },
    Sunday: { am: { enabled: false, start: '09:00', end: '12:00' }, pm: { enabled: false, start: '13:00', end: '17:00' } }
  });

  const [allowanceData, setAllowanceData] = useState({
    broughtForward: 0,
    allowance: 25,
    timeInLieu: 0,
    pto: 0
  });

 const countries = [
  { name: 'Afghanistan', flag: 'af' },
  { name: 'Åland Islands', flag: 'ax' },
  { name: 'Albania', flag: 'al' },
  { name: 'Algeria', flag: 'dz' },
  { name: 'American Samoa', flag: 'as' },
  { name: 'Andorra', flag: 'ad' },
  { name: 'Angola', flag: 'ao' },
  { name: 'Anguilla', flag: 'ai' },
  { name: 'Antarctica', flag: 'aq' },
  { name: 'Antigua and Barbuda', flag: 'ag' },
  { name: 'Argentina', flag: 'ar' },
  { name: 'Armenia', flag: 'am' },
  { name: 'Aruba', flag: 'aw' },
  { name: 'Australia', flag: 'au' },
  { name: 'Austria', flag: 'at' },
  { name: 'Azerbaijan', flag: 'az' },
  { name: 'Bahamas', flag: 'bs' },
  { name: 'Bahrain', flag: 'bh' },
  { name: 'Bangladesh', flag: 'bd' },
  { name: 'Barbados', flag: 'bb' },
  { name: 'Belarus', flag: 'by' },
  { name: 'Belgium', flag: 'be' },
  { name: 'Belize', flag: 'bz' },
  { name: 'Benin', flag: 'bj' },
  { name: 'Bermuda', flag: 'bm' },
  { name: 'Bhutan', flag: 'bt' },
  { name: 'Bolivia', flag: 'bo' },
  { name: 'Bonaire, Sint Eustatius and Saba', flag: 'bq' },
  { name: 'Bosnia and Herzegovina', flag: 'ba' },
  { name: 'Botswana', flag: 'bw' },
  { name: 'Bouvet Island', flag: 'bv' },
  { name: 'Brazil', flag: 'br' },
  { name: 'British Indian Ocean Territory', flag: 'io' },
  { name: 'Brunei Darussalam', flag: 'bn' },
  { name: 'Bulgaria', flag: 'bg' },
  { name: 'Burkina Faso', flag: 'bf' },
  { name: 'Burundi', flag: 'bi' },
  { name: 'Cabo Verde', flag: 'cv' },
  { name: 'Cambodia', flag: 'kh' },
  { name: 'Cameroon', flag: 'cm' },
  { name: 'Canada', flag: 'ca' },
  { name: 'Cayman Islands', flag: 'ky' },
  { name: 'Central African Republic', flag: 'cf' },
  { name: 'Chad', flag: 'td' },
  { name: 'Chile', flag: 'cl' },
  { name: 'China', flag: 'cn' },
  { name: 'Christmas Island', flag: 'cx' },
  { name: 'Cocos (Keeling) Islands', flag: 'cc' },
  { name: 'Colombia', flag: 'co' },
  { name: 'Comoros', flag: 'km' },
  { name: 'Congo', flag: 'cg' },
  { name: 'Congo, Democratic Republic of the', flag: 'cd' },
  { name: 'Cook Islands', flag: 'ck' },
  { name: 'Costa Rica', flag: 'cr' },
  { name: 'Côte d\'Ivoire', flag: 'ci' },
  { name: 'Croatia', flag: 'hr' },
  { name: 'Cuba', flag: 'cu' },
  { name: 'Curaçao', flag: 'cw' },
  { name: 'Cyprus', flag: 'cy' },
  { name: 'Czechia', flag: 'cz' },
  { name: 'Denmark', flag: 'dk' },
  { name: 'Djibouti', flag: 'dj' },
  { name: 'Dominica', flag: 'dm' },
  { name: 'Dominican Republic', flag: 'do' },
  { name: 'Ecuador', flag: 'ec' },
  { name: 'Egypt', flag: 'eg' },
  { name: 'El Salvador', flag: 'sv' },
  { name: 'Equatorial Guinea', flag: 'gq' },
  { name: 'Eritrea', flag: 'er' },
  { name: 'Estonia', flag: 'ee' },
  { name: 'Eswatini', flag: 'sz' },
  { name: 'Ethiopia', flag: 'et' },
  { name: 'Falkland Islands (Malvinas)', flag: 'fk' },
  { name: 'Faroe Islands', flag: 'fo' },
  { name: 'Fiji', flag: 'fj' },
  { name: 'Finland', flag: 'fi' },
  { name: 'France', flag: 'fr' },
  { name: 'French Guiana', flag: 'gf' },
  { name: 'French Polynesia', flag: 'pf' },
  { name: 'French Southern Territories', flag: 'tf' },
  { name: 'Gabon', flag: 'ga' },
  { name: 'Gambia', flag: 'gm' },
  { name: 'Georgia', flag: 'ge' },
  { name: 'Germany', flag: 'de' },
  { name: 'Ghana', flag: 'gh' },
  { name: 'Gibraltar', flag: 'gi' },
  { name: 'Greece', flag: 'gr' },
  { name: 'Greenland', flag: 'gl' },
  { name: 'Grenada', flag: 'gd' },
  { name: 'Guadeloupe', flag: 'gp' },
  { name: 'Guam', flag: 'gu' },
  { name: 'Guatemala', flag: 'gt' },
  { name: 'Guernsey', flag: 'gg' },
  { name: 'Guinea', flag: 'gn' },
  { name: 'Guinea-Bissau', flag: 'gw' },
  { name: 'Guyana', flag: 'gy' },
  { name: 'Haiti', flag: 'ht' },
  { name: 'Heard Island and McDonald Islands', flag: 'hm' },
  { name: 'Holy See (Vatican City State)', flag: 'va' },
  { name: 'Honduras', flag: 'hn' },
  { name: 'Hong Kong', flag: 'hk' },
  { name: 'Hungary', flag: 'hu' },
  { name: 'Iceland', flag: 'is' },
  { name: 'India', flag: 'in' },
  { name: 'Indonesia', flag: 'id' },
  { name: 'Iran, Islamic Republic of', flag: 'ir' },
  { name: 'Iraq', flag: 'iq' },
  { name: 'Ireland', flag: 'ie' },
  { name: 'Isle of Man', flag: 'im' },
  { name: 'Israel', flag: 'il' },
  { name: 'Italy', flag: 'it' },
  { name: 'Jamaica', flag: 'jm' },
  { name: 'Japan', flag: 'jp' },
  { name: 'Jersey', flag: 'je' },
  { name: 'Jordan', flag: 'jo' },
  { name: 'Kazakhstan', flag: 'kz' },
  { name: 'Kenya', flag: 'ke' },
  { name: 'Kiribati', flag: 'ki' },
  { name: 'Korea, Democratic People\'s Republic of', flag: 'kp' },
  { name: 'Korea, Republic of', flag: 'kr' },
  { name: 'Kuwait', flag: 'kw' },
  { name: 'Kyrgyzstan', flag: 'kg' },
  { name: 'Lao People\'s Democratic Republic', flag: 'la' },
  { name: 'Latvia', flag: 'lv' },
  { name: 'Lebanon', flag: 'lb' },
  { name: 'Lesotho', flag: 'ls' },
  { name: 'Liberia', flag: 'lr' },
  { name: 'Libya', flag: 'ly' },
  { name: 'Liechtenstein', flag: 'li' },
  { name: 'Lithuania', flag: 'lt' },
  { name: 'Luxembourg', flag: 'lu' },
  { name: 'Macao', flag: 'mo' },
  { name: 'Madagascar', flag: 'mg' },
  { name: 'Malawi', flag: 'mw' },
  { name: 'Malaysia', flag: 'my' },
  { name: 'Maldives', flag: 'mv' },
  { name: 'Mali', flag: 'ml' },
  { name: 'Malta', flag: 'mt' },
  { name: 'Marshall Islands', flag: 'mh' },
  { name: 'Martinique', flag: 'mq' },
  { name: 'Mauritania', flag: 'mr' },
  { name: 'Mauritius', flag: 'mu' },
  { name: 'Mayotte', flag: 'yt' },
  { name: 'Mexico', flag: 'mx' },
  { name: 'Micronesia, Federated States of', flag: 'fm' },
  { name: 'Moldova, Republic of', flag: 'md' },
  { name: 'Monaco', flag: 'mc' },
  { name: 'Mongolia', flag: 'mn' },
  { name: 'Montenegro', flag: 'me' },
  { name: 'Montserrat', flag: 'ms' },
  { name: 'Morocco', flag: 'ma' },
  { name: 'Mozambique', flag: 'mz' },
  { name: 'Myanmar', flag: 'mm' },
  { name: 'Namibia', flag: 'na' },
  { name: 'Nauru', flag: 'nr' },
  { name: 'Nepal', flag: 'np' },
  { name: 'Netherlands', flag: 'nl' },
  { name: 'New Caledonia', flag: 'nc' },
  { name: 'New Zealand', flag: 'nz' },
  { name: 'Nicaragua', flag: 'ni' },
  { name: 'Niger', flag: 'ne' },
  { name: 'Nigeria', flag: 'ng' },
  { name: 'Niue', flag: 'nu' },
  { name: 'Norfolk Island', flag: 'nf' },
  { name: 'North Macedonia', flag: 'mk' },
  { name: 'Northern Mariana Islands', flag: 'mp' },
  { name: 'Norway', flag: 'no' },
  { name: 'Oman', flag: 'om' },
  { name: 'Pakistan', flag: 'pk' },
  { name: 'Palau', flag: 'pw' },
  { name: 'Palestine, State of', flag: 'ps' },
  { name: 'Panama', flag: 'pa' },
  { name: 'Papua New Guinea', flag: 'pg' },
  { name: 'Paraguay', flag: 'py' },
  { name: 'Peru', flag: 'pe' },
  { name: 'Philippines', flag: 'ph' },
  { name: 'Pitcairn', flag: 'pn' },
  { name: 'Poland', flag: 'pl' },
  { name: 'Portugal', flag: 'pt' },
  { name: 'Puerto Rico', flag: 'pr' },
  { name: 'Qatar', flag: 'qa' },
  { name: 'Réunion', flag: 're' },
  { name: 'Romania', flag: 'ro' },
  { name: 'Russian Federation', flag: 'ru' },
  { name: 'Rwanda', flag: 'rw' },
  { name: 'Saint Barthélemy', flag: 'bl' },
  { name: 'Saint Helena, Ascension and Tristan da Cunha', flag: 'sh' },
  { name: 'Saint Kitts and Nevis', flag: 'kn' },
  { name: 'Saint Lucia', flag: 'lc' },
  { name: 'Saint Martin (French part)', flag: 'mf' },
  { name: 'Saint Pierre and Miquelon', flag: 'pm' },
  { name: 'Saint Vincent and the Grenadines', flag: 'vc' },
  { name: 'Samoa', flag: 'ws' },
  { name: 'San Marino', flag: 'sm' },
  { name: 'Sao Tome and Principe', flag: 'st' },
  { name: 'Saudi Arabia', flag: 'sa' },
  { name: 'Senegal', flag: 'sn' },
  { name: 'Serbia', flag: 'rs' },
  { name: 'Seychelles', flag: 'sc' },
  { name: 'Sierra Leone', flag: 'sl' },
  { name: 'Singapore', flag: 'sg' },
  { name: 'Sint Maarten (Dutch part)', flag: 'sx' },
  { name: 'Slovakia', flag: 'sk' },
  { name: 'Slovenia', flag: 'si' },
  { name: 'Solomon Islands', flag: 'sb' },
  { name: 'Somalia', flag: 'so' },
  { name: 'South Africa', flag: 'za' },
  { name: 'South Georgia and the South Sandwich Islands', flag: 'gs' },
  { name: 'South Sudan', flag: 'ss' },
  { name: 'Spain', flag: 'es' },
  { name: 'Sri Lanka', flag: 'lk' },
  { name: 'Sudan', flag: 'sd' },
  { name: 'Suriname', flag: 'sr' },
  { name: 'Svalbard and Jan Mayen', flag: 'sj' },
  { name: 'Sweden', flag: 'se' },
  { name: 'Switzerland', flag: 'ch' },
  { name: 'Syrian Arab Republic', flag: 'sy' },
  { name: 'Taiwan, Province of China', flag: 'tw' },
  { name: 'Tajikistan', flag: 'tj' },
  { name: 'Tanzania, United Republic of', flag: 'tz' },
  { name: 'Thailand', flag: 'th' },
  { name: 'Timor-Leste', flag: 'tl' },
  { name: 'Togo', flag: 'tg' },
  { name: 'Tokelau', flag: 'tk' },
  { name: 'Tonga', flag: 'to' },
  { name: 'Trinidad and Tobago', flag: 'tt' },
  { name: 'Tunisia', flag: 'tn' },
  { name: 'Turkey', flag: 'tr' },
  { name: 'Turkmenistan', flag: 'tm' },
  { name: 'Turks and Caicos Islands', flag: 'tc' },
  { name: 'Tuvalu', flag: 'tv' },
  { name: 'Uganda', flag: 'ug' },
  { name: 'Ukraine', flag: 'ua' },
  { name: 'United Arab Emirates', flag: 'ae' },
  { name: 'United Kingdom', flag: 'gb' },
  { name: 'United States', flag: 'us' },
  { name: 'United States Minor Outlying Islands', flag: 'um' },
  { name: 'Uruguay', flag: 'uy' },
  { name: 'Uzbekistan', flag: 'uz' },
  { name: 'Vanuatu', flag: 'vu' },
  { name: 'Venezuela, Bolivarian Republic of', flag: 've' },
  { name: 'Viet Nam', flag: 'vn' },
  { name: 'Virgin Islands, British', flag: 'vg' },
  { name: 'Virgin Islands, U.S.', flag: 'vi' },
  { name: 'Wallis and Futuna', flag: 'wf' },
  { name: 'Western Sahara', flag: 'eh' },
  { name: 'Yemen', flag: 'ye' },
  { name: 'Zambia', flag: 'zm' },
  { name: 'Zimbabwe', flag: 'zw' }
];

  const tunisianRegions = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", 
    "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", 
    "Kasserine", "Sidi Bouzid", "Gabès", "Medenine", "Tataouine", "Gafsa", "Tozeur", "Kebili"
  ];

  const tabs = ['Profile', 'Contact', 'Schedule', 'Allowance'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScheduleChange = (day: DayOfWeek, period: 'am' | 'pm', field: 'enabled' | 'start' | 'end', value: string | boolean) => {
    setScheduleData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: {
          ...prev[day][period],
          [field]: value
        }
      }
    }));
  };

  const calculateWorkingHours = () => {
    let totalHours = 0;
    (Object.keys(scheduleData) as DayOfWeek[]).forEach((day) => {
      const schedule = scheduleData[day];
      if (schedule.am.enabled) {
        const amStart = parseTime(schedule.am.start);
        const amEnd = parseTime(schedule.am.end);
        totalHours += (amEnd - amStart) / (1000 * 60 * 60);
      }
      if (schedule.pm.enabled) {
        const pmStart = parseTime(schedule.pm.start);
        const pmEnd = parseTime(schedule.pm.end);
        totalHours += (pmEnd - pmStart) / (1000 * 60 * 60);
      }
    });
    return totalHours;
  };

  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  };

  const getDayStatus = (day: DayOfWeek) => {
    const schedule = scheduleData[day];
    if (!schedule.am.enabled && !schedule.pm.enabled) return 'Not Working';
    if (schedule.am.enabled && schedule.pm.enabled) return 'Full Day';
    return 'Partial Day';
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const filteredRegions = tunisianRegions.filter(region =>
    region.toLowerCase().includes(searchRegion.toLowerCase())
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department</label>
              <select className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option>{formData.department}</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Approver</label>
              <select className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option>{formData.approver}</option>
              </select>
              <button className={`mt-2 flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                <FiEye size={16} />
                View calendar
              </button>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Employment start date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="dd-mmm-yyyy"
                  value={formData.employmentStartDate}
                  onChange={(e) => handleInputChange('employmentStartDate', e.target.value)}
                  className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <FiCalendar className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date of birth</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="dd-mmm-yyyy"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <FiCalendar className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="standard"
                    name="userType"
                    value="Standard user"
                    checked={userRole === 'Standard user'}
                    onChange={(e) => setUserRole(e.target.value)}
                    className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  />
                  <label htmlFor="standard" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Standard user</label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="director"
                    name="userType"
                    value="Director"
                    checked={userRole === 'Director'}
                    onChange={(e) => setUserRole(e.target.value)}
                    className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  />
                  <label htmlFor="director" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Director</label>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>View all departments and bookings on the wellchart and all users' calendars.</span>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="administrator"
                    name="userType"
                    value="Administrator"
                    checked={userRole === 'Administrator'}
                    onChange={(e) => setUserRole(e.target.value)}
                    className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  />
                  <label htmlFor="administrator" className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}>
                    Administrator
                    <FiInfo className="text-yellow-500" size={16} />
                  </label>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Access and change everything, including all settings.</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Contact':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job title</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emergency contact</label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payroll ID</label>
              <input
                type="text"
                value={formData.payrollId}
                onChange={(e) => handleInputChange('payrollId', e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        );

      case 'Schedule':
        return (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-800'}`}>
              <p className="text-sm">
                It's important to set your schedule correctly, so that when you book time off the deductions are accurate. Add a new work schedule if your hours change.
              </p>
            </div>

            <button className={`flex items-center gap-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
              <FiPlus size={16} />
              New work schedule
            </button>

            <div className={`border rounded-lg p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Effective</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>From: Start of employment</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}></th>
                      <th className={`text-center py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>AM</th>
                      <th className={`text-center py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>PM</th>
                      <th className={`text-center py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(scheduleData).map(([day, schedule]) => (
                      <tr key={day} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className={`py-3 px-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{day}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={schedule.am.enabled}
                              onChange={(e) => handleScheduleChange(day as DayOfWeek, 'am', 'enabled', e.target.checked)}
                              className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                            />
                            <input
                              type="time"
                              value={schedule.am.start}
                              onChange={(e) => handleScheduleChange(day as DayOfWeek, 'am', 'start', e.target.value)}
                              className={`px-2 py-1 border rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            />
                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>to</span>
                            <input
                              type="time"
                              value={schedule.am.end}
                              onChange={(e) => handleScheduleChange(day as DayOfWeek, 'am', 'end', e.target.value)}
                              className={`px-2 py-1 border rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={schedule.pm.enabled}
                              onChange={(e) => handleScheduleChange(day as DayOfWeek, 'pm', 'enabled', e.target.checked)}
                              className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                            />
                            <input
                              type="time"
                              value={schedule.pm.start}
                              onChange={(e) => handleScheduleChange(day as DayOfWeek, 'pm', 'start', e.target.value)}
                              className={`px-2 py-1 border rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            />
                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>to</span>
                            <input
                              type="time"
                              value={schedule.pm.end}
                              onChange={(e) => handleScheduleChange(day as DayOfWeek, 'pm', 'end', e.target.value)}
                              className={`px-2 py-1 border rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            />
                          </div>
                        </td>
                        <td className={`py-3 px-4 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {getDayStatus(day as DayOfWeek)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This schedule repeats every week</p>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{calculateWorkingHours()} working hours</p>
              </div>
            </div>
          </div>
        );

      case 'Allowance':
        return (
          <div className="space-y-6">
            <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>Allowances are tracked in days.</span>
              <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Change to hourly.</button>
            </div>

            <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>Use the accrual system?</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${darkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-200 text-yellow-800'}`}>PRO feature</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={true}
                className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
              />
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}>
                Public holidays
                <FiInfo className="text-yellow-500" size={16} />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <button
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇹🇳</span>
                    <span>{selectedCountry}</span>
                  </div>
                  <FiChevronDown size={16} />
                </button>

                {countryDropdownOpen && (
                  <div className={`absolute top-full left-0 right-0 border rounded-lg mt-1 max-h-60 overflow-y-auto z-10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                    <div className="p-2">
                      <div className="relative">
                        <FiSearch className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchCountry}
                          onChange={(e) => setSearchCountry(e.target.value)}
                          className={`w-full pl-9 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                        />
                      </div>
                    </div>
                    {filteredCountries.map((country) => (
                      <button
                        key={country.name}
                        onClick={() => {
                          setSelectedCountry(country.name);
                          setCountryDropdownOpen(false);
                          setSearchCountry('');
                        }}
                        className={`w-full px-3 py-2 text-left flex items-center gap-2 ${
                          selectedCountry === country.name
                            ? darkMode
                              ? 'bg-blue-900 text-blue-100'
                              : 'bg-blue-100 text-blue-800'
                            : darkMode
                              ? 'hover:bg-gray-700 text-gray-300'
                              : 'hover:bg-blue-50 text-gray-800'
                        }`}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                  className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <div className="flex items-center gap-2">
                    <span>{selectedRegion}</span>
                  </div>
                  <FiChevronDown size={16} />
                </button>

                {regionDropdownOpen && (
                  <div className={`absolute top-full left-0 right-0 border rounded-lg mt-1 max-h-60 overflow-y-auto z-10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                    <div className="p-2">
                      <div className="relative">
                        <FiSearch className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
                        <input
                          type="text"
                          placeholder="Search regions..."
                          value={searchRegion}
                          onChange={(e) => setSearchRegion(e.target.value)}
                          className={`w-full pl-9 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                        />
                      </div>
                    </div>
                    {filteredRegions.map((region) => (
                      <button
                        key={region}
                        onClick={() => {
                          setSelectedRegion(region);
                          setRegionDropdownOpen(false);
                          setSearchRegion('');
                        }}
                        className={`w-full px-3 py-2 text-left ${
                          selectedRegion === region
                            ? darkMode
                              ? 'bg-blue-900 text-blue-100'
                              : 'bg-blue-100 text-blue-800'
                            : darkMode
                              ? 'hover:bg-gray-700 text-gray-300'
                              : 'hover:bg-blue-50 text-gray-800'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <select className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
              <option>January to December 2025</option>
            </select>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Brought forward</label>
                  <div className="flex">
                    <input
                      type="number"
                      value={allowanceData.broughtForward}
                      onChange={(e) => setAllowanceData(prev => ({ ...prev, broughtForward: parseInt(e.target.value) || 0 }))}
                      className={`flex-1 px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <span className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'} border-l-0 rounded-r-lg`}>Days</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Allowance</label>
                  <div className="flex">
                    <input
                      type="number"
                      value={allowanceData.allowance}
                      onChange={(e) => setAllowanceData(prev => ({ ...prev, allowance: parseInt(e.target.value) || 0 }))}
                      className={`flex-1 px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <span className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'} border-l-0 rounded-r-lg`}>Days</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time in lieu</label>
                  <div className="flex">
                    <input
                      type="number"
                      value={allowanceData.timeInLieu}
                      onChange={(e) => setAllowanceData(prev => ({ ...prev, timeInLieu: parseInt(e.target.value) || 0 }))}
                      className={`flex-1 px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <span className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'} border-l-0 rounded-r-lg`}>Days</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>PTO</label>
                  <div className="flex">
                    <input
                      type="number"
                      value={allowanceData.pto}
                      onChange={(e) => setAllowanceData(prev => ({ ...prev, pto: parseInt(e.target.value) || 0 }))}
                      className={`flex-1 px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <span className={`px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'} border-l-0 rounded-r-lg`}>Days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center py-2">
                <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Total</span>
                <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{allowanceData.broughtForward + allowanceData.allowance + allowanceData.timeInLieu + allowanceData.pto}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} p-4 sm:p-6 lg:p-8 transition-colors duration-200`}>
      <div className={`max-w-full mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Employee Profile</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-200 text-gray-800'} hover:scale-105 transition-transform`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Profile Header */}
        <div className="p-6 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
            MS
          </div>
          <div>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {formData.firstName} {formData.lastName}
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formData.email}</p>
          </div>
          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
            {userRole}
          </span>
        </div>

        {/* Tabs */}
        <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6`}>
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? `${darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}`
                    : `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Footer Actions */}
        <div className={`p-6 border-t ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} flex justify-end space-x-3`}>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-600 text-gray-100 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Cancel
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileManager;