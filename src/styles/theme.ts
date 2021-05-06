import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  color: {
    main: '#F6F7FB',
    typo: '#DCDCDC',
    icon: '#C4C4C4',
    black: '#000000',
    good: '#3358FF',
    usually: '#1496CC',
    bad: '#FF900D',
    veryBad: '#FF3E00',
    gray3: '#939393',
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
