import React from 'react';
import {
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaBell,
  FaUserCircle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  percentageChange: string;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, percentageChange, isPositive }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
    <div>
      <h3 className="text-gray-500 text-sm font-semibold uppercase">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      <div className={`flex items-center text-sm mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
        <span>{percentageChange}</span>
      </div>
    </div>
    <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
      {icon}
    </div>
  </div>
);

interface TransactionItemProps {
  type: string;
  description: string;
  amount: string;
  date: string;
  isCredit: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ type, description, amount, date, isCredit }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
    <div>
      <p className="font-medium text-gray-800">{description}</p>
      <p className="text-sm text-gray-500">{type} - {date}</p>
    </div>
    <p className={`font-semibold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>{isCredit ? '+' : '-'}{amount}</p>
  </div>
);

const FinanceDashboardPage: React.FC = () => {
  // Sample Data for Charts
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.8)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Financial Overview',
      },
    },
  };

  return (
    <div className="h-full bg-gray-900 flex ">

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Finance Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <FaBell className="text-2xl" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-3xl text-gray-500" />
              <span className="font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Balance"
            value="$125,000"
            icon={<FaWallet className="text-2xl" />}
            percentageChange="+3.5% vs last month"
            isPositive={true}
          />
          <StatCard
            title="Monthly Income"
            value="$8,500"
            icon={<FaMoneyBillWave className="text-2xl" />}
            percentageChange="+7.2% vs last month"
            isPositive={true}
          />
          <StatCard
            title="Monthly Expenses"
            value="$3,200"
            icon={<FaExchangeAlt className="text-2xl" />}
            percentageChange="-1.8% vs last month"
            isPositive={false}
          />
          <StatCard
            title="Savings Rate"
            value="35%"
            icon={<FaChartLine className="text-2xl" />}
            percentageChange="+0.5% vs last month"
            isPositive={true}
          />
        </section>

        {/* Charts and Recent Transactions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Financial Overview Chart</h2>
            <div className="h-80"> {/* Set a fixed height for the chart container */}
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="divide-y divide-gray-100">
              <TransactionItem
                type="Income"
                description="Salary Deposit"
                amount="$5,000.00"
                date="June 15, 2025"
                isCredit={true}
              />
              <TransactionItem
                type="Expense"
                description="Groceries"
                amount="$120.50"
                date="June 14, 2025"
                isCredit={false}
              />
              <TransactionItem
                type="Expense"
                description="Electricity Bill"
                amount="$85.00"
                date="June 13, 2025"
                isCredit={false}
              />
              <TransactionItem
                type="Income"
                description="Freelance Payment"
                amount="$750.00"
                date="June 12, 2025"
                isCredit={true}
              />
              <TransactionItem
                type="Expense"
                description="Online Subscription"
                amount="$15.99"
                date="June 11, 2025"
                isCredit={false}
              />
               <TransactionItem
                type="Expense"
                description="Restaurant Dinner"
                amount="$65.00"
                date="June 10, 2025"
                isCredit={false}
              />
            </div>
            <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              View All Transactions
            </button>
          </div>
        </section>

        {/* Additional Sections (e.g., Budget, Upcoming Bills) can go here */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example: Budget Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Budget Overview</h2>
            {/* You can add a progress bar or more detailed budget info here */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Food & Dining</span>
                <span>$350 / $500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Utilities</span>
                <span>$200 / $250</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <button className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
              Manage Budgets
            </button>
          </div>

          {/* Example: Upcoming Bills */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Bills</h2>
            <ul className="divide-y divide-gray-100">
              <li className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-800">Rent</p>
                  <p className="text-sm text-gray-500">Due: July 1, 2025</p>
                </div>
                <p className="font-semibold text-red-600">$1,500.00</p>
              </li>
              <li className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-800">Internet Bill</p>
                  <p className="text-sm text-gray-500">Due: June 28, 2025</p>
                </div>
                <p className="font-semibold text-red-600">$70.00</p>
              </li>
              <li className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-800">Car Insurance</p>
                  <p className="text-sm text-gray-500">Due: July 5, 2025</p>
                </div>
                <p className="font-semibold text-red-600">$100.00</p>
              </li>
            </ul>
            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
              View All Bills
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FinanceDashboardPage;
