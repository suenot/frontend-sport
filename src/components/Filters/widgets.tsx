import React from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { WidgetProps } from '@rjsf/utils';
import { useTranslation } from 'next-i18next';

export const RangeWidget = ({
  value,
  onChange,
  schema,
  uiSchema,
  label,
}: WidgetProps) => {
  const { t } = useTranslation(['sections/events']);
  const min = schema.items?.minimum || 0;
  const max = schema.items?.maximum || 1000;
  const step = schema.items?.multipleOf || 50;

  return (
    <VStack spacing={2} align="stretch">
      {label && (
        <Text fontSize="md" color="gray.600" fontWeight="500">
          {label}
        </Text>
      )}
      <RangeSlider
        min={min}
        max={max}
        step={step}
        value={value || [min, max]}
        onChange={onChange}
        aria-label={['min', 'max']}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Text fontSize="xs" color="gray.600">
        {t('filters.participantsRange', {
          min: value ? value[0] : min,
          max: value ? value[1] : max
        })}
      </Text>
    </VStack>
  );
};
