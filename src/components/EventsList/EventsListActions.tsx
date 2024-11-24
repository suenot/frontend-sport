import React from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { useTranslation } from 'next-i18next';
import { getEventSchema, getUiSchema } from './eventSchema';
import { Event } from './types';
import { useQueryStore } from '@deep-foundation/store/query';

interface EventsListActionsProps {
  role: 'user' | 'manager';
  onRoleToggle: () => void;
  onEventAdd?: (event: Event) => void;
  onEventEdit?: (event: Event) => void;
  onEventDelete?: (eventId: string) => void;
  selectedEvent?: Event;
}

export const EventsListActions: React.FC<EventsListActionsProps> = ({
  role,
  onRoleToggle,
  onEventAdd,
  onEventEdit,
  onEventDelete,
  selectedEvent
}) => {
  const { t } = useTranslation(['sections/events']);
  
  const [isFormOpen, setIsFormOpen] = useQueryStore<boolean>('isFormOpen', false);
  const [isEditMode, setIsEditMode] = useQueryStore<boolean>('isEditMode', false);
  const toast = useToast();

  // Получаем схемы с переводами
  const schema = React.useMemo(() => getEventSchema(t), [t]);
  const uiSchema = React.useMemo(() => getUiSchema(t), [t]);

  const handleSubmit = (formData: any) => {
    if (isEditMode && selectedEvent) {
      onEventEdit?.({
        ...selectedEvent,
        ...formData.formData
      });
    } else {
      onEventAdd?.({
        ...formData.formData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'draft',
        media: {
          banners: [],
          thumbnails: [],
          gallery: [],
          videos: []
        },
        links: {
          socialMedia: {}
        },
        organizer: {
          id: '1',
          name: 'Организатор',
          logos: [],
          contacts: {}
        },
        tags: [],
        seo: {}
      });
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditMode(false);
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  React.useEffect(() => {
    if (selectedEvent) {
      setIsEditMode(true);
      setIsFormOpen(true);
    }
  }, [selectedEvent, setIsFormOpen, setIsEditMode]);

  return (
    <Box mb={4}>
      <HStack justify="space-between">
        <Button
          colorScheme={role === 'manager' ? 'green' : 'gray'}
          onClick={onRoleToggle}
          size="lg"
        >
          {t('actions.role', {
            role: t(role === 'manager' ? 'actions.roleManager' : 'actions.roleUser')
          })}
        </Button>

        {role === 'manager' && (
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleAddClick}
            size="lg"
          >
            {t('actions.addEvent')}
          </Button>
        )}
      </HStack>

      {/* Модальное окно формы */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={handleCloseForm}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader>
            {t(isEditMode ? 'actions.editEvent' : 'actions.addEvent')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              validator={validator}
              formData={selectedEvent}
              onSubmit={handleSubmit}
              // Локализация формы
              translateString={id => t(id)}
            >
              <ButtonGroup mt={4} spacing={4} width="100%">
                <Button type="submit" colorScheme="blue" size="lg">
                  {t('actions.save')}
                </Button>
                <Button 
                  onClick={handleCloseForm}
                  size="lg"
                >
                  {t('actions.cancel')}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
