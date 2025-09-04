import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)




// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import { SidebarProvider } from './SidebarManager.tsx'

// createRoot(document.getElementById('root')!).render(
//    <React.StrictMode>
//     <BrowserRouter>
//       <SidebarProvider> {/* Wrap the App with SidebarProvider */}
//         <App />
//       </SidebarProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )


