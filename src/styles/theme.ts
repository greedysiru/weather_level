import { DefaultTheme } from 'styled-components';

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
    gray0: '#ECEEF4',
    gray1: '#DCDCDC',
    gray2: '#C4C4C4',
    gray3: '#939393',
    purple: '#EBEBF9',
  },
  view: {
    mobile: `(max-width: 767px)`,
    tablet: `(max-width: 1024px)`,
    desktop: `(min-width: 1025px)`,
    width: '360px',
  },
  flex: {
    column: 'display: flex; flex-direction:column; align-items: center; justify-content: space-between; ',
    row: 'display: flex; align-items: center; justify-content: space-between;',
  },
  shadow: `box-shadow: 8px 8px 16px 4px rgba(133, 139, 146, 0.06)`,
  border_box: `box-sizing:border-box;`
};

export default theme;
