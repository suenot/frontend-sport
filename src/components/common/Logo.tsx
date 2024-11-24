'use client';

import { Box, Text } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <Box display="inline-flex" alignItems="center" position="relative">
      <Text fontSize="xl" fontWeight="bold">
        Sport
        <Box as="span" position="relative">
          hub
          <Box
            position="absolute"
            bottom="-2px"
            left="0"
            width="100%"
            height="4px"
            backgroundColor="#ff9000"
            zIndex="-1"
          />
        </Box>
      </Text>
    </Box>
  );
};

Logo.displayName = 'Logo';
