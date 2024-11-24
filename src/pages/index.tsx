import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  useColorMode,
  Avatar,
  HStack,
  Link as ChakraLink,
  Image,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CalendarIcon, SearchIcon, BellIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { FaTelegram, FaGithub, FaGlobe, FaMapMarkedAlt, FaCalendarAlt } from 'react-icons/fa';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { AnimatedStats } from '../components/Landing/AnimatedStats';

const Feature = ({ title, text, icon }: { title: string; text: string; icon: any }) => {
  const { colorMode } = useColorMode();
  
  return (
    <VStack
      align="start"
      p={6}
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      borderRadius="lg"
      shadow="md"
      spacing={4}
    >
      <Icon as={icon} w={10} h={10} color="blue.500" />
      <Heading size="md">{title}</Heading>
      <Text>{text}</Text>
    </VStack>
  );
};

const TeamMember = ({ 
  nameRu,
  nameEn,
  role, 
  telegram, 
  github 
}: { 
  nameRu: string;
  nameEn: string;
  role: string; 
  telegram: string;
  github: string;
}) => {
  const { colorMode } = useColorMode();
  const { i18n } = useTranslation();
  const name = i18n.language === 'ru' ? nameRu : nameEn;
  
  return (
    <VStack
      p={6}
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      borderRadius="lg"
      shadow="md"
      spacing={4}
      align="center"
    >
      <Avatar size="xl" name={name} />
      <VStack spacing={2}>
        <Heading size="md">{name}</Heading>
        <Text color="gray.500">{role}</Text>
        <HStack spacing={4}>
          <ChakraLink href={`https://t.me/${telegram.replace('@', '')}`} isExternal>
            <Icon as={FaTelegram} w={6} h={6} color="blue.500" />
          </ChakraLink>
          <ChakraLink href={`https://github.com/${github.replace('@', '')}`} isExternal>
            <Icon as={FaGithub} w={6} h={6} />
          </ChakraLink>
        </HStack>
      </VStack>
    </VStack>
  );
};

const sections = ['frontend', 'backend', 'integrations'] as const;
type TechSection = typeof sections[number];

export default function Landing() {
  const { t } = useTranslation(['sections/landing']);
  const { colorMode } = useColorMode();

  const getTechItems = (section: TechSection): string[] => {
    const items = t(`tech.${section}.items`, { returnObjects: true });
    return Array.isArray(items) ? items : [];
  };

  const getTranslatedArray = (key: string): string[] => {
    const items = t(key, { returnObjects: true });
    return Array.isArray(items) ? items : [];
  };

  const advantageItems: string[] = getTranslatedArray('advantages.items');

  return (
    <Box>
      {/* Hero секция */}
      <Box 
        bg={colorMode === 'dark' ? 'gray.800' : 'blue.500'} 
        color="white" 
        py={20}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" textAlign="center">
            <Heading size="2xl">
              {t('hero.title')}
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              {t('hero.description')}
            </Text>
            <AnimatedStats />
            <Link href="/app" passHref legacyBehavior>
              <Button 
                as="a"
                size="lg" 
                colorScheme={colorMode === 'dark' ? 'blue' : 'white'}
                variant={colorMode === 'dark' ? 'solid' : 'outline'}
              >
                {t('hero.cta')}
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      {/* Проблематика */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading>{t('problems.title')}</Heading>
              <Text fontSize="lg" maxW="2xl">
                {t('problems.description')}
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
              <Feature
                icon={CalendarIcon}
                title={t('problems.features.sync.title')}
                text={t('problems.features.sync.description')}
              />
              <Feature
                icon={SearchIcon}
                title={t('problems.features.search.title')}
                text={t('problems.features.search.description')}
              />
              <Feature
                icon={BellIcon}
                title={t('problems.features.notifications.title')}
                text={t('problems.features.notifications.description')}
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Преимущества */}
      <Box 
        py={20} 
        bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
      >
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading>{t('advantages.title')}</Heading>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
              {advantageItems.map((item: string, index: number) => (
                <Box
                  key={index}
                  p={8}
                  bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                  borderRadius="xl"
                  shadow="lg"
                  transition="all 0.2s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'xl'
                  }}
                >
                  <Text fontSize="xl" fontWeight="medium">
                    {item}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Подборка соревнований */}
      <Box py={20} bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center">{t('competitions.title')}</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
              <Feature
                icon={FaGlobe}
                title={t('competitions.features.countries.title')}
                text={t('competitions.features.countries.description')}
              />
              <Feature
                icon={FaMapMarkedAlt}
                title={t('competitions.features.disciplines.title')}
                text={t('competitions.features.disciplines.description')}
              />
              <Feature
                icon={FaCalendarAlt}
                title={t('competitions.features.dates.title')}
                text={t('competitions.features.dates.description')}
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Команда */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center">{t('team.title')}</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
              <TeamMember
                nameRu="Болат Идрисов"
                nameEn="Bolat Idrisov"
                role={t('team.roles.teamLead')}
                telegram="@mthgradr"
                github="@Groesie"
              />
              <TeamMember
                nameRu="Марина Идрисова"
                nameEn="Marina Idrisova"
                role={t('team.roles.ml')}
                telegram="@m_idrsv"
                github="@Marina394"
              />
              <TeamMember
                nameRu="Соловьёв Евгений"
                nameEn="Eugen Soloviov"
                role={t('team.roles.fullstack')}
                telegram="@suenot"
                github="@suenot"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Архитектура решения */}
      <Box py={20} bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading textAlign="center">{t('architecture.title')}</Heading>
            <Text fontSize="lg" textAlign="center" maxW="3xl">
              {t('architecture.description')}
            </Text>
            <Box w="100%" p={4}>
              <Image
                src="/architecture.png"
                alt="Architecture diagram"
                fallbackSrc="https://via.placeholder.com/800x400?text=Architecture+Diagram"
              />
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Скринкаст */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading textAlign="center">{t('screencast.title')}</Heading>
            <Box w="100%" maxW="4xl" h={{ base: "300px", md: "500px" }}>
              <iframe
                width="100%"
                height="100%"
                src="about:blank" // Placeholder for the actual video URL
                title="Product Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Киллерфичи */}
      <Box py={20} bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading textAlign="center">{t('features.title')}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
              <List spacing={4}>
                {getTranslatedArray('features.items').map((feature, index) => (
                  <ListItem key={index} display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text>{feature}</Text>
                  </ListItem>
                ))}
              </List>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Сценарии использования */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading textAlign="center">{t('useCases.title')}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
              {getTranslatedArray('useCases.items').map((useCase, index) => (
                <Box
                  key={index}
                  p={6}
                  bg={colorMode === 'dark' ? 'gray.700' : 'white'}
                  borderRadius="lg"
                  shadow="md"
                >
                  <Text>{useCase}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Развитие продукта */}
      <Box py={20} bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading textAlign="center">{t('roadmap.title')}</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
              {getTranslatedArray('roadmap.phases').map((phase: any, index) => (
                <VStack
                  key={index}
                  p={6}
                  bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                  borderRadius="lg"
                  shadow="md"
                  spacing={4}
                >
                  <Heading size="md">{phase.title}</Heading>
                  <List spacing={2}>
                    {(phase.items || []).map((item: string, itemIndex: number) => (
                      <ListItem key={itemIndex} display="flex" alignItems="center">
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        <Text>{item}</Text>
                      </ListItem>
                    ))}
                  </List>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Технологии */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" textAlign="center">
            <Heading>{t('tech.title')}</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {sections.map((section) => (
                <VStack key={section}>
                  <Heading size="md">{t(`tech.${section}.title`)}</Heading>
                  {getTechItems(section).map((item: string, index: number) => (
                    <Text key={index}>{item}</Text>
                  ))}
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA */}
      <Box 
        py={20} 
        bg={colorMode === 'dark' ? 'gray.700' : 'blue.500'} 
        color="white"
      >
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between"
          >
            <VStack align="start" spacing={4} mb={{ base: 8, md: 0 }}>
              <Heading size="lg">{t('cta.title')}</Heading>
              <Text fontSize="lg">
                {t('cta.description')}
              </Text>
            </VStack>
            <Link href="/app" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                colorScheme={colorMode === 'dark' ? 'blue' : 'white'}
                variant={colorMode === 'dark' ? 'solid' : 'outline'}
              >
                {t('cta.button')}
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['sections/common', 'sections/landing', 'sections/events'])),
    },
  };
};
