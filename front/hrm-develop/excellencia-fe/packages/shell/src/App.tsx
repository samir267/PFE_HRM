// import './App.css'

// // Implementation for the Shell package
// // Path: packages/shell/src/App.tsx

// import React, { lazy, Suspense, useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';

// // Layout components
// import MainLayout from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout';

// // Core components
// import Loading from './components/common/Loading.tsx';
// import PrivateRoute from './components/PrivateRoute/index.ts';
// import Login from './pages/auth/Login/Login.tsx';
// import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword.tsx';
// import Register from './pages/auth/Register/Register.tsx';
// import Dashboard from './pages/dashboard/index.tsx';
// import Onboarding from './pages/onboarding/Onboarding.tsx';
// import CandyBoxTest from './pages/dashboard/CandyBox.tsx';



// // Lazy-loaded Micro Frontends with error boundaries
// const FinanceApp = lazy(() =>
//   import('finance/Module').catch(() => ({
//     default: () => <div>Finance module unavailable for Shell</div>
//   }))
// );

// const HRMApp = lazy(() =>
//   import('hrm/Module').catch(() => ({
//     default: () => <div>HRM module unavailable for Shell</div>
//   }))
// );


// const PMDApp = lazy(() =>
//   import('projectmgt/Module').catch(() => ({
//     default: () => <div>Project Management module unavailable for Shell</div>
//   }))
// );

// const SCMApp = lazy(() =>
//   import('supplychain/Module').catch(() => ({
//     default: () => <div>Supply Chain  Management module unavailable for Shell</div>
//   }))
// );


// const PRMApp = lazy(() =>
//   import('productionmgt/Module').catch(() => ({
//     default: () => <div>Project Management module unavailable for Shell</div>
//   }))
// );


// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
//   const [isOnboarded, setIsOnboarded] = useState<boolean>(true);

//   useEffect(() => {
//     // Check if user is authenticated
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       setIsAuthenticated(true);

//       // Check if user has completed onboarding
//       const onboardingCompleted = localStorage.getItem('onboarding_completed');
//       if (onboardingCompleted === 'true') {
//         setIsOnboarded(true);
//       }
//     }
//   }, []);

//   return (
//     <Provider store={store}>
//       <Router
//         future={{
//           v7_startTransition: true,
//           v7_relativeSplatPath: true,
//         }}
//       >
//         <Routes>
//           {/* Auth Routes */}
//           <Route element={<AuthLayout />}>
//             <Route path="/login" element={<Login onSuccess={() => setIsAuthenticated(true)} />} />
//             <Route path="/register" element={<Register onSuccess={() => setIsAuthenticated(true)} />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//           </Route>

//           {/* Onboarding Route */}
//           <Route
//             path="/onboarding"
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <Onboarding onComplete={() => setIsOnboarded(true)} />
//               </PrivateRoute>
//             }
//           />

//           {/* Protected Application Routes */}
//           <Route
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated && isOnboarded}>
//                 <MainLayout />
//               </PrivateRoute>
//             }
//           >
//             <Route path="/dashboard" element={<Dashboard />} />

//             {/* Add the Candybox route here */}
//             <Route path="/dashboard/candybox" element={<CandyBoxTest isOpen={false} onClose={function (): void {
//               throw new Error('Function not implemented.');
//             } } />} />

//             {/* Micro-Frontend Routes */}

//             <Route path="/finance/*" element={
//               <Suspense fallback={<Loading />}>
//                 <FinanceApp />
//               </Suspense>
//             } />


//             <Route path="/hrm/*" element={
//               <Suspense fallback={<Loading />}>
//                 <HRMApp/>
//               </Suspense>
//             } />

//             <Route path="/projectmgt/*" element={
//               <Suspense fallback={<Loading />}>
//                 <PMDApp/>
//               </Suspense>
//             } />

//             <Route path="/supplychain/*" element={
//               <Suspense fallback={<Loading />}>
//                 <SCMApp/>
//               </Suspense>
//             } />


//             <Route path="/productionmgt/*" element={
//               <Suspense fallback={<Loading />}>
//                 <PRMApp/>
//               </Suspense>
//             } />



//           </Route>

//           {/* Redirect based on authentication state */}
//           <Route path="/" element={
//             isAuthenticated
//               ? (isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />)
//               : <Navigate to="/login" />
//           } />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


// import './App.css'

// // Implementation for the Shell package
// // Path: packages/shell/src/App.tsx

// import React, { lazy, Suspense, useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';

// // Layout components
// import MainLayout from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout';

// // Core components
// import Loading from './components/common/Loading.tsx';
// import PrivateRoute from './components/PrivateRoute/index.ts';
// import Login from './pages/auth/Login/Login.tsx';
// import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword.tsx';
// import Register from './pages/auth/Register/Register.tsx';
// import Dashboard from './pages/dashboard/index.tsx';
// import Onboarding from './pages/onboarding/Onboarding.tsx';
// import CandyBoxTest from './pages/dashboard/CandyBox.tsx';
// import NotFoundPage from './pages/shared/NotFoundPage.tsx';



// // Lazy-loaded Micro Frontends with error boundaries
// const FinanceApp = lazy(() =>
//   import('finance/Module').catch(() => ({
//     default: () => <div>Finance module unavailable for Shell</div>
//   }))
// );

// const HRMApp = lazy(() =>
//   import('hrm/Module').catch(() => ({
//     default: () => <div>HRM module unavailable for Shell</div>
//   }))
// );


// const PMDApp = lazy(() =>
//   import('projectmgt/Module').catch(() => ({
//     default: () => <div>Project Management module unavailable for Shell</div>
//   }))
// );

// const SCMApp = lazy(() =>
//   import('supplychain/Module').catch(() => ({
//     default: () => <div>Supply Chain  Management module unavailable for Shell</div>
//   }))
// );


// const PRMApp = lazy(() =>
//   import('productionmgt/Module').catch(() => ({
//     default: () => <div>Project Management module unavailable for Shell</div>
//   }))
// );


// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
//   const [isOnboarded, setIsOnboarded] = useState<boolean>(true);

//   useEffect(() => {
//     // Check if user is authenticated
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       setIsAuthenticated(true);

//       // Check if user has completed onboarding
//       const onboardingCompleted = localStorage.getItem('onboarding_completed');
//       if (onboardingCompleted === 'true') {
//         setIsOnboarded(true);
//       }
//     }
//   }, []);

//   return (
//     <Provider store={store}>
//       <Router
//         future={{
//           v7_startTransition: true,
//           v7_relativeSplatPath: true,
//         }}
//       >
//         <Routes>
//           {/* Auth Routes */}
//           <Route element={<AuthLayout />}>
//             <Route path="/login" element={<Login onSuccess={() => setIsAuthenticated(true)} />} />
//             <Route path="/register" element={<Register onSuccess={() => setIsAuthenticated(true)} />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//           </Route>

//           {/* Onboarding Route */}
//           <Route
//             path="/onboarding"
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated}>
//                 <Onboarding onComplete={() => setIsOnboarded(true)} />
//               </PrivateRoute>
//             }
//           />

//           {/* Protected Application Routes */}
//           <Route
//             element={
//               <PrivateRoute isAuthenticated={isAuthenticated && isOnboarded}>
//                 <MainLayout />
//               </PrivateRoute>
//             }
//           >
//             <Route path="/dashboard" element={<Dashboard />} />

//             {/* Add the Candybox route here */}
//             <Route path="/dashboard/candybox" element={<CandyBoxTest isOpen={false} onClose={function (): void {
//               throw new Error('Function not implemented.');
//             } } />} />

//             {/* Micro-Frontend Routes */}

//             <Route path="/finance/*" element={
//               <Suspense fallback={<Loading />}>
//                 <FinanceApp />
//               </Suspense>
//             } />


//             <Route path="/hrm/*" element={
//               <Suspense fallback={<Loading />}>
//                 <HRMApp/>
//               </Suspense>
//             } />

//             <Route path="/projectmgt/*" element={
//               <Suspense fallback={<Loading />}>
//                 <PMDApp/>
//               </Suspense>
//             } />

//             <Route path="/supplychain/*" element={
//               <Suspense fallback={<Loading />}>
//                 <SCMApp/>
//               </Suspense>
//             } />


//             <Route path="/productionmgt/*" element={
//               <Suspense fallback={<Loading />}>
//                 <PRMApp/>
//               </Suspense>
//             } />

//           </Route>

//           {/* Redirect based on authentication state */}
//           <Route path="/" element={
//             isAuthenticated
//               ? (isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />)
//               : <Navigate to="/login" />
//           } />

//           {/* Catch-all route for 404 Not Found */}
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


import './App.css';

// Implementation for the Shell package
// Path: packages/shell/src/App.tsx

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Core components
import Loading from './components/common/Loading.tsx';
import PrivateRoute from './components/PrivateRoute/index.ts';
import Login from './pages/auth/Login/Login.tsx';
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword.tsx';
import Register from './pages/auth/Register/Register.tsx';
import Dashboard from './pages/dashboard/index.tsx';
import Onboarding from './pages/onboarding/Onboarding.tsx';
import CandyBoxTest from './pages/dashboard/CandyBox.tsx';
import NotFoundPage from './pages/shared/NotFoundPage.tsx';
import GatewayTimeout from './pages/shared/GatewayTimeout.tsx'; // Assuming this exists based on the image
import InternalServerError from './pages/shared/InternalServerError.tsx'; // Assuming this exists based on the image
import ServiceUnavailable from './pages/shared/ServiceUnavailable.tsx'; // Assuming this exists based on the image


// Lazy-loaded Micro Frontends with error boundaries
const FinanceApp = lazy(() =>
  import('finance/Module').catch(() => ({
    default: () => <div>Finance module unavailable for Shell</div>
  }))
);

const HRMApp = lazy(() =>
  import('hrm/Module').catch(() => ({
    default: () => <div>HRM module unavailable for Shell</div>
  }))
);


const PMDApp = lazy(() =>
  import('projectmgt/Module').catch(() => ({
    default: () => <div>Project Management module unavailable for Shell</div>
  }))
);

const SCMApp = lazy(() =>
  import('supplychain/Module').catch(() => ({
    default: () => <div>Supply Chain Management module unavailable for Shell</div>
  }))
);


const PRMApp = lazy(() =>
  import('productionmgt/Module').catch(() => ({
    default: () => <div>Production Management module unavailable for Shell</div>
  }))
);


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);

      // Check if user has completed onboarding
      const onboardingCompleted = localStorage.getItem('onboarding_completed');
      if (onboardingCompleted === 'true') {
        setIsOnboarded(true);
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login onSuccess={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register onSuccess={() => setIsAuthenticated(true)} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Onboarding Route */}
          <Route
            path="/onboarding"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Onboarding onComplete={() => setIsOnboarded(true)} />
              </PrivateRoute>
            }
          />

          {/* Protected Application Routes */}
          <Route
            element={
              <PrivateRoute isAuthenticated={isAuthenticated && isOnboarded}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Add the Candybox route here */}
            <Route path="/dashboard/candybox" element={<CandyBoxTest isOpen={false} onClose={() => { /* Function not implemented, provide a placeholder or actual logic */ }} />} />

            {/* Micro-Frontend Routes */}
            <Route path="/finance/*" element={
              <Suspense fallback={<Loading />}>
                <FinanceApp />
              </Suspense>
            } />

            <Route path="/hrm/*" element={
              <Suspense fallback={<Loading />}>
                <HRMApp/>
              </Suspense>
            } />

            <Route path="/projectmgt/*" element={
              <Suspense fallback={<Loading />}>
                <PMDApp/>
              </Suspense>
            } />

            <Route path="/supplychain/*" element={
              <Suspense fallback={<Loading />}>
                <SCMApp/>
              </Suspense>
            } />

            <Route path="/productionmgt/*" element={
              <Suspense fallback={<Loading />}>
                <PRMApp/>
              </Suspense>
            } />

            {/* Shared Error Pages - assuming these are also protected or within MainLayout context */}
            <Route path="/gateway-timeout" element={<GatewayTimeout />} />
            <Route path="/internal-server-error" element={<InternalServerError />} />
            <Route path="/service-unavailable" element={<ServiceUnavailable />} />

          </Route>

          {/* Redirect based on authentication state */}
          <Route path="/" element={
            isAuthenticated
              ? (isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />)
              : <Navigate to="/login" />
          } />

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
