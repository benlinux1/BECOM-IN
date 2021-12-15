import { rest } from 'msw'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'
 
import Freelances from './Prestations'
import { render } from '../../utils/test'
 

const freelancersMockedData = [
  {
      id: 942,
      name: 'Harry Potter',
      job: 'Magicien frontend',
      picture: '',
  },
  {
      id: 943,
      name: 'Hermione Granger',
      job: 'Magicienne fullstack',
      picture: '',
  },
]


const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
      // On passe en paramètre les datas mockées (simulées) dans ce qui est retourné en json
      return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)
 
// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

it('Should display freelancers names', async () => {
  render(
    <Freelances />
  )
  // Teste l'apparition du loader avant chargement des données
  expect(screen.getByTestId('loader')).toBeTruthy()
  
  // Teste la disparition du loader après chargement des données
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

  // Teste les données qui sont récupérées
  await waitFor(() => {
      expect(screen.getByText('Harry Potter')).toBeTruthy()
      expect(screen.getByText('Hermione Granger')).toBeTruthy()
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  })
})
