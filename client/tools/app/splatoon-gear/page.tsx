'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  IconButton,
  Chip
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

// Splatoon gear powers (common ones)
const GEAR_POWERS = [
  'インク効率アップ(メイン)',
  'インク効率アップ(サブ)', 
  'インク回復力アップ',
  'ヒト移動速度アップ',
  'イカダッシュ速度アップ',
  'スペシャル増加量アップ',
  'スペシャル減少量ダウン',
  'スペシャル性能アップ',
  'スーパージャンプ時間短縮',
  'サブ性能アップ',
  'メイン性能アップ',
  'カムバック',
  'ラストスパート',
  'イカニンジャ',
  'サーマルインク',
  'ステルスジャンプ',
  'スタートダッシュ',
  'ゾンビ',
  'リベンジ',
  'おこたえください'
];

interface GearPower {
  id: string;
  name: string;
  value: number;
}

export default function SplatoonGearPage() {
  const [gearPowers, setGearPowers] = useState<GearPower[]>([]);
  const [nextId, setNextId] = useState(1);

  const TOTAL_GEAR_POWER = 57; // 10*3 + 3*3*3 = 57
  
  const currentTotal = gearPowers.reduce((sum, gp) => sum + gp.value, 0);
  const remaining = TOTAL_GEAR_POWER - currentTotal;

  const addGearPower = () => {
    const newGearPower: GearPower = {
      id: `gp-${nextId}`,
      name: GEAR_POWERS[0],
      value: 0
    };
    setGearPowers([...gearPowers, newGearPower]);
    setNextId(nextId + 1);
  };

  const removeGearPower = (id: string) => {
    setGearPowers(gearPowers.filter(gp => gp.id !== id));
  };

  const updateGearPowerName = (id: string, name: string) => {
    setGearPowers(gearPowers.map(gp => 
      gp.id === id ? { ...gp, name } : gp
    ));
  };

  const updateGearPowerValue = (id: string, delta: number) => {
    setGearPowers(gearPowers.map(gp => {
      if (gp.id === id) {
        const newValue = Math.max(0, Math.min(57, gp.value + delta));
        return { ...gp, value: newValue };
      }
      return gp;
    }));
  };

  const resetAll = () => {
    setGearPowers([]);
    setNextId(1);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Splatoon ギア検討ツール
      </Typography>
      
      <Typography variant="body1" gutterBottom align="center" color="text.secondary">
        ギアパワーを選択して、合計57のギアパワーでギア構成を検討できます
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={addGearPower}
          disabled={remaining <= 0}
        >
          ギアパワー追加
        </Button>
        
        <Chip 
          label={`残りギアパワー: ${remaining}`}
          color={remaining < 0 ? 'error' : remaining === 0 ? 'success' : 'primary'}
          size="large"
        />
        
        <Button 
          variant="outlined" 
          color="error"
          startIcon={<Delete />}
          onClick={resetAll}
          disabled={gearPowers.length === 0}
        >
          リセット
        </Button>
      </Box>

      <Grid container spacing={2}>
        {gearPowers.map((gearPower) => (
          <Grid item xs={12} key={gearPower.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl sx={{ minWidth: 200, flex: 1 }}>
                    <InputLabel>ギアパワー</InputLabel>
                    <Select
                      value={gearPower.name}
                      label="ギアパワー"
                      onChange={(e) => updateGearPowerName(gearPower.id, e.target.value)}
                    >
                      {GEAR_POWERS.map((power) => (
                        <MenuItem key={power} value={power}>
                          {power}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton 
                      onClick={() => updateGearPowerValue(gearPower.id, -10)}
                      disabled={gearPower.value < 10}
                      color="secondary"
                    >
                      <Remove />
                    </IconButton>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateGearPowerValue(gearPower.id, -10)}
                      disabled={gearPower.value < 10}
                    >
                      -10
                    </Button>
                    
                    <IconButton 
                      onClick={() => updateGearPowerValue(gearPower.id, -3)}
                      disabled={gearPower.value < 3}
                      color="secondary"
                    >
                      <Remove />
                    </IconButton>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateGearPowerValue(gearPower.id, -3)}
                      disabled={gearPower.value < 3}
                    >
                      -3
                    </Button>

                    <TextField
                      value={gearPower.value}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ width: 80 }}
                      size="small"
                    />

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateGearPowerValue(gearPower.id, 3)}
                      disabled={remaining < 3}
                    >
                      +3
                    </Button>
                    <IconButton 
                      onClick={() => updateGearPowerValue(gearPower.id, 3)}
                      disabled={remaining < 3}
                      color="primary"
                    >
                      <Add />
                    </IconButton>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateGearPowerValue(gearPower.id, 10)}
                      disabled={remaining < 10}
                    >
                      +10
                    </Button>
                    <IconButton 
                      onClick={() => updateGearPowerValue(gearPower.id, 10)}
                      disabled={remaining < 10}
                      color="primary"
                    >
                      <Add />
                    </IconButton>

                    <IconButton 
                      onClick={() => removeGearPower(gearPower.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {gearPowers.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
          <Typography variant="h6">
            「ギアパワー追加」ボタンでギアパワーを追加してください
          </Typography>
        </Box>
      )}

      {remaining < 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error" variant="body2" align="center">
            ⚠️ ギアパワーの合計が57を超えています。調整してください。
          </Typography>
        </Box>
      )}
    </Box>
  );
}