import { applyTheme } from 'component-library/Fieldset';

const styles = {
  shared: {},
  defaultProps: {
    size: 'tiny',
  },
  tiny: {
    container: `
      border: 5px solid blue;
      background-color: green;
    `,
    legend: 'color: purple;',
  },
  large: {
    container: `
      border: 5px solid red;
      background-color: yelllow;
    `,
    legend: 'color: orange;',
  },
};

const Fieldset: any = applyTheme(styles);

export default Fieldset;
