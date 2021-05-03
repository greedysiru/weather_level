import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  color: {
    main: '#F6F7FB',
    yellow: '#F9964f',
    gray: '#EEEDED',
    mainBlur: '#E7F0F9',
    mainThick: '#121B46',
  },
  view: {
    mobile: `(max-width: 767px)`,
    tablet: `(max-width: 1024px)`,
    desktop: `(min-width: 1025px)`
  },
  flex: {
    column: 'display: flex; flex-direction:column; align-items: center; justify-content: space-between; ',
    row: 'display: flex; align-items: center; justify-content: space-between;',
  },
  border_box: `box-sizing:border-box;`
};

export default theme;
