import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectFiltro() {
      const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Filtro</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Filtro"
        onChange={handleChange}
      >

        <MenuItem value={1}>Distância</MenuItem>
        <MenuItem value={2}>Avaliação de mercado</MenuItem>
        <MenuItem value={3}>Preço</MenuItem>
      </Select>
    </FormControl>
  );
}