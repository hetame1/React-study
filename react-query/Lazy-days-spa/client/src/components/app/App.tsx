import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { theme } from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { Routess } from './Routes';

export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Loading />
      <Routess />
    </ChakraProvider>
  );
}
