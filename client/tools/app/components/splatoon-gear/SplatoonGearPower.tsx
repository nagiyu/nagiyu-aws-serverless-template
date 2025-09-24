'use client';

import React from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

import BasicSelect from '@client-common/components/inputs/Selects/BasicSelect';
import BasicNumberField from '@client-common/components/inputs/TextFields/BasicNumberField';
import ContainedButton from '@client-common/components/inputs/Buttons/ContainedButton';
import DirectionStack from '@client-common/components/Layout/Stacks/DirectionStack';
import { SelectOptionType } from '@client-common/interfaces/SelectOptionType';

interface GearPower {
  id: string;
  name: string;
  value: number;
}

interface SplatoonGearPowerProps {
  gearPower: GearPower;
  gearPowerOptions: SelectOptionType[];
  remainingPower: number;
  onNameChange: (id: string, name: string) => void;
  onValueChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function SplatoonGearPower({
  gearPower,
  gearPowerOptions,
  remainingPower,
  onNameChange,
  onValueChange,
  onRemove
}: SplatoonGearPowerProps) {
  const handleNameChange = (value: string) => {
    onNameChange(gearPower.id, value);
  };

  const handleValueChange = (delta: number) => {
    onValueChange(gearPower.id, delta);
  };

  return (
    <Card>
      <CardContent>
        <div style={{ overflowX: 'auto', minWidth: 0 }}>
          <DirectionStack spacing={2} alignItems="center" style={{ minWidth: 'fit-content' }}>
            <div style={{ minWidth: 180 }}>
              <BasicSelect
                label="ギアパワー"
                options={gearPowerOptions}
                value={gearPower.name}
                onChange={handleNameChange}
              />
            </div>

            <ContainedButton
              label="-10"
              onClick={() => handleValueChange(-10)}
              disabled={gearPower.value < 10}
            />
            
            <ContainedButton
              label="-3"
              onClick={() => handleValueChange(-3)}
              disabled={gearPower.value < 3}
            />

            <div style={{ width: 80 }}>
              <BasicNumberField
                value={gearPower.value}
                readonly={true}
              />
            </div>

            <ContainedButton
              label="+3"
              onClick={() => handleValueChange(3)}
              disabled={remainingPower < 3}
            />

            <ContainedButton
              label="+10"
              onClick={() => handleValueChange(10)}
              disabled={remainingPower < 10}
            />

            <IconButton 
              onClick={() => onRemove(gearPower.id)}
              color="error"
            >
              <Delete />
            </IconButton>
          </DirectionStack>
        </div>
      </CardContent>
    </Card>
  );
}