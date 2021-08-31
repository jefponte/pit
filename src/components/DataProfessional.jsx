import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
const periodos = [{ descricao: "2021.1" }, { descricao: "2021.2" }];
const regimes = [
  { descricao: "40 horas" },
  { descricao: "30 horas" },
  { descricao: "20 horas" },
];

function DataProfessional({ aoEnviar, defaultData }) {
  const [periodo, setPeriodo] = useState(defaultData.periodo);
  const [regime, setRegime] = useState(defaultData.regime);


  const handleChangePeriodo = (event, values) => {
    setPeriodo(values);
  };
  const handleChangeRegime = (event, values) => {
    setRegime(values);
  };


  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        aoEnviar({ periodo, regime });
      }}
    >
      <Autocomplete
        id="periodo"
        name="periodo"
        options={periodos}
        getOptionLabel={(option) => option.descricao}
        onChange={handleChangePeriodo}
        value={periodo}
        fullWidth
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Período Letivo"
            variant="outlined"
          />
        )}
      />
      <br />
      <Autocomplete
        id="regime"
        name="regime"
        options={regimes}
        getOptionLabel={(option) => option.descricao}
        onChange={handleChangeRegime}
        value={regime}
        fullWidth
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Período Letivo"
            variant="outlined"
          />
        )}
      /><br/>

      <Button type="submit" variant="contained" color="primary">
        Avançar
      </Button>
    </form>
  );
}
export default DataProfessional;
