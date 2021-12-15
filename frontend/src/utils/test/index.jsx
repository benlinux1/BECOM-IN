/* Teste les rendus en direct
    - Router (MemoryRouter)
    - Theme (ThemeProvider)
    - Affichage des réponses enregistrées (SurveyProvider)

*/

import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider, SurveyProvider } from '../context'
import { MemoryRouter } from 'react-router-dom'
 
function Wrapper({ children }) {
    return (
        <MemoryRouter>
            <ThemeProvider>
                <SurveyProvider>{children}</SurveyProvider>
            </ThemeProvider>
        </MemoryRouter>
    )
}
 
export function render(ui) {
    rtlRender(ui, { wrapper: Wrapper })
}