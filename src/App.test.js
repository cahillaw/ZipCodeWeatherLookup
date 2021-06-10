import { render } from '@testing-library/react';
import App from './App';

test('App loads', () => {
  const { getByText } = render(<App/>)
  getByText("ZipCode Weather Lookup")
})

