import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import App from './App.tsx'
import { appStore } from './app/appStore.ts' // Import your Redux store
import { appMuiTheme } from './app/muiConfig.ts'
import './index.scss'

createRoot(document.getElementById('root')!).render(
    <StrictMode> {/* React Strict Mode for highlighting potential problems in an application */}
        <Provider store={appStore}> {/* Redux Toolkit Provider */}
            <ThemeProvider theme={appMuiTheme}> {/* MUI Theme Provider */}
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
)
