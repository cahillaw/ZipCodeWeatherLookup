import { render } from '@testing-library/react';
import App from './App';
import ZipLookup from './pages/zipLookup/ziplookup';

test('App loads', () => {
  const { getByText } = render(<App/>)
  getByText("ZipCode Weather Lookup")
})

test('ZipCode Lookup component loads', () => {
  const { getByText } = render(<ZipLookup/>)
  getByText("ZipCode Weather Lookup")
})
