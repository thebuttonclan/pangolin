import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import React from 'react';
import Textarea from '../src/Textarea';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';

expect.extend(toHaveNoViolations);

describe('Textarea', () => {
  it('Should have no accessibility violations', async () => {
    const { container } = render(<Textarea />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
