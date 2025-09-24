'use client';

import React from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

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
        <DirectionStack spacing={2} alignItems="center">
          <div style={{ minWidth: 200, flex: 1 }}>
            <BasicSelect
              label="ギアパワー"
              options={gearPowerOptions}
              value={gearPower.name}
              onChange={handleNameChange}
            />
          </div>

          <div style={{ overflowX: 'auto', minWidth: 0 }}>
            <DirectionStack spacing={1} style={{ minWidth: 'fit-content' }}>
              <IconButton 
                onClick={() => handleValueChange(-10)}
                disabled={gearPower.value < 10}
                color="secondary"
              >
                <Remove />
              </IconButton>
              <ContainedButton
                label="-10"
                onClick={() => handleValueChange(-10)}
                disabled={gearPower.value < 10}
              />
              
              <IconButton 
                onClick={() => handleValueChange(-3)}
                disabled={gearPower.value < 3}
                color="secondary"
              >
                <Remove />
              </IconButton>
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
              <IconButton 
                onClick={() => handleValueChange(3)}
                disabled={remainingPower < 3}
                color="primary"
              >
                <Add />
              </IconButton>

              <ContainedButton
                label="+10"
                onClick={() => handleValueChange(10)}
                disabled={remainingPower < 10}
              />
              <IconButton 
                onClick={() => handleValueChange(10)}
                disabled={remainingPower < 10}
                color="primary"
              >
                <Add />
              </IconButton>

              <IconButton 
                onClick={() => onRemove(gearPower.id)}
                color="error"
              >
                <Delete />
              </IconButton>
            </DirectionStack>
          </div>
        </DirectionStack>
      </CardContent>
    </Card>
  );
}