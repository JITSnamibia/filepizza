/// <reference types="@testing-library/jest-dom" />
import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import JitsLabsShareQueryClientProvider from '../../src/components/QueryClientProvider'

describe('QueryClientProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <JitsLabsShareQueryClientProvider>
        <span>child</span>
      </JitsLabsShareQueryClientProvider>,
    )
    expect(getByText('child')).toBeInTheDocument()
  })
})
