import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface StatItem {
  value: number;
  label: string;
  description: string;
}

const AnimatedStat = ({ value, label, description }: StatItem) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // 60fps

    const updateNumber = () => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
      } else {
        setDisplayValue(Math.floor(start));
        requestAnimationFrame(updateNumber);
      }
    };

    updateNumber();
  }, [value]);

  return (
    <Box textAlign="center" p={4}>
      <Text fontSize="5xl" fontWeight="bold" mb={2}>
        {new Intl.NumberFormat().format(displayValue)}
      </Text>
      <Text fontSize="xl" fontWeight="medium" mb={2}>
        {label}
      </Text>
      <Text fontSize="md" maxW="sm">
        {description}
      </Text>
    </Box>
  );
};

export const AnimatedStats = () => {
  const { t } = useTranslation(['sections/landing']);

  const stats: StatItem[] = [
    {
      value: 1586389,
      label: t('stats.participants.label'),
      description: t('stats.participants.description')
    },
    {
      value: 578,
      label: t('stats.events.label'),
      description: t('stats.events.description')
    },
    {
      value: 37,
      label: t('stats.countries.label'),
      description: t('stats.countries.description')
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%" mt={8}>
      {stats.map((stat, index) => (
        <AnimatedStat key={index} {...stat} />
      ))}
    </SimpleGrid>
  );
};
