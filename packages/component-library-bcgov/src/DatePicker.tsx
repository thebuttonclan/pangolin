import { applyTheme, StyleConfig } from 'component-library/DatePicker';

const styles = {
  shared: {
    label: `
      display: block;
      margin-bottom: 0.2777em;
    `,
    input: `
      display: block;
      border: 2px solid #606060;
      border-radius: 0;
      padding: 0.5em 0.6em;
    `,
  },
  size: {
    small: {
      container: `
        font-size: 0.8rem;
      `,
    },
    medium: {
      container: `
        font-size: 1rem;
      `,
    },
    large: {
      container: `
        font-size: 1.2rem;
      `,
    },
  },
  required: {
    label: `
      &:after {
        margin: -0.2em 0em 0em 0.2em;
        content: '*';
        color: #DB2828;
      }
    `,
  },
  rounded: {
    input: `
      border-radius: 0.25em;
    `,
  },
};

const config: StyleConfig = {
  defaultProps: {
    size: 'medium',
    rounded: true,
  },
  staticProps: ['fullWidth'],
};

const DatePicker = applyTheme(styles, config);

export default DatePicker;
