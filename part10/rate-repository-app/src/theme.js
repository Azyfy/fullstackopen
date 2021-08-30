import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        textNav: "white",
        error: "#d73a4a",
        background: "#24292e",
        backgroundMain: "#e1e4e8",
    },
    fontSizes: {
        body: 14,
        nav: 17,
        small: 11,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            andoid: "Roboto",
            ios: "Arial",
            default: "System",
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    images: {
        tinyLogo: {
            width: 50,
            height: 50,
          },
        logo: {
            width: 66,
            height: 58,
          },
    }
  };
  
  export default theme;