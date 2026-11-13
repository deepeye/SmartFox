import { render, screen } from '@testing-library/react'
import Instruction from '../index'

const mockUseDocLink = vi.hoisted(() => vi.fn())

vi.mock('@/context/i18n', () => ({
  useDocLink: mockUseDocLink,
}))

describe('ChunkStructureInstruction', () => {
  beforeEach(() => {
    mockUseDocLink.mockReturnValue((path: string) => `https://docs.example.com${path}`)
  })

  // The instruction card should render the learning copy and link to the chunking guide.
  describe('Rendering', () => {
    it('links to the chunking guide', () => {
      render(<Instruction />)

      expect(
        screen.getByText('workflow.nodes.knowledgeBase.chunkStructureTip.learnMore'),
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('link', {
          name: 'workflow.nodes.knowledgeBase.chunkStructureTip.learnMore',
        }),
      ).not.toBeInTheDocument()
    })
  })
})
