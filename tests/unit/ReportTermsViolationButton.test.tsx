/// <reference types="@testing-library/jest-dom" />
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import JitsLabsShareQueryClientProvider from '../../src/components/QueryClientProvider'

vi.mock('../../src/components/WebRTCProvider', () => ({
  useWebRTCPeer: () => ({ peer: { connect: vi.fn(() => ({ on: vi.fn(), close: vi.fn() })) } }),
}))

import ReportTermsViolationButton from '../../src/components/ReportTermsViolationButton'

describe('ReportTermsViolationButton', () => {
  it('opens modal on click', () => {
    const { getByText } = render(
      <JitsLabsShareQueryClientProvider>
        <ReportTermsViolationButton uploaderPeerID="peer" slug="slug" />
      </JitsLabsShareQueryClientProvider>,
    )
    fireEvent.click(getByText('Report suspicious transfer'))
    expect(getByText('Found a suspicious delivery?')).toBeInTheDocument()
  })
})
