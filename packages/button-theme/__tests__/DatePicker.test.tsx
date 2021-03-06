import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import React from 'react';
import DatePicker from '../src/DatePicker';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';

expect.extend(toHaveNoViolations);

describe('DatePicker', () => {
  it('Should have no accessibility violations', async () => {
    const { container } = render(<DatePicker />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
