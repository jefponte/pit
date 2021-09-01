import { Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { DataContext } from "../services/DataContext";
import List from "@material-ui/core/List";
import Element from "../components/Element";
import Range from "./Range";

const tiposForm3 = [
  { descricao: "Tutoria", sigla: "T" },
  { descricao: "Coordenação", sigla: "C" },
  { descricao: "Orientação", sigla: "O" },
];
const tiposForm4 = [
  { descricao: "Coordenador", sigla: "CD" },
  { descricao: "Colaborador", sigla: "CL" },
];

const programas = [
  { descricao: "PIBID" },
  { descricao: "Residência" },
  { descricao: "PET" },
  { descricao: "Monitoria" },
  { descricao: "Pulsar" },
];

const tiposAtividade = [
  { descricao: "ENSINO DE GRADUAÇÃO", id: 0, minimo: 4, maximo: 20 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU", id: 7, minimo: 0, maximo: 16 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO LATO SENSU", id: 1, minimo: 0, maximo: 16},
  { descricao: "ATIVIDADES COMPLEMENTARES DE ENSINO", id: 2, minimo: 8, maximo: 20},
  { descricao: "PROGRAMAS E PROJETOS DE PESQUISA", id: 3, minimo: 8, maximo: 20},
  { descricao: "PROGRAMAS E PROJETOS DE EXTENSÃO", id: 4 , minimo: 8, maximo: 20},
  { descricao: "ATIVIDADES DE GESTÃO", id: 5, minimo: 8, maximo: 40 },
  { descricao: "OUTRAS ATIVIDADES RELEVANTES", id: 6, minimo: 8, maximo: 20 },
];

class PanelData extends Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);
    this.state = {
      codigo: "",
      disciplina: "",
      horasSemanais: "",
      tipo: null,
      tipoFuncao: null,
      programa: "",
      orientando: "",
      dataAprovacao: "",
      titulo: "",
      numeroPortaria: "",
      data: "",
      cargoFuncao: "",
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeData = this.removeData.bind(this);
    this.form1 = this.form1.bind(this);
  }
  removeData(itemId) {
    console.log(itemId);

    let arrayData = this.context.data;
    let dataIndex = arrayData.findIndex((atividade) => atividade.id === itemId);
    arrayData.splice(dataIndex, 1);
    this.context.data = arrayData;

    this.setState({
      codigo: "",
      disciplina: "",
      horasSemanais: "",
      tipo: null,
      tipoFuncao: null,
      programa: "",
      orientando: "",
      dataAprovacao: "",
      titulo: "",
      numeroPortaria: "",
      data: "",
      cargoFuncao: "",
    });
  }
  handleAdd() {
    const hora = this.state;
    const newHora = Object.assign({}, hora, { id: Date.now() });

    this.context.data.push(newHora);
    this.setState({
      codigo: "",
      disciplina: "",
      horasSemanais: "",
      tipo: null,
      tipoFuncao: null,
      programa: "",
      orientando: "",
      dataAprovacao: "",
      titulo: "",
      numeroPortaria: "",
      data: "",
      cargoFuncao: "",
    });
  }
  handleChange(event) {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;

    this.setState({
      [name]: value,
    });
  }
  onTagsChange = (event, values) => {
    this.setState({
      tipo: values,
    });

    this.setState({
      codigo: "",
      disciplina: "",
      horasSemanais: "",
      tipoFuncao: null,
      programa: null,
      orientando: "",
      dataAprovacao: "",
      titulo: "",
      numeroPortaria: "",
      data: "",
      cargoFuncao: "",
    });
  };
  onChangeTipoFuncao = (event, values) => {
    this.setState({
      tipoFuncao: values,
    });
  };

  onChangePrograma = (event, values) => {
    this.setState({
      programa: values,
    });
  };
  
  form1(){
      const state = this.state;
      return(<>
      
      <TextField
          required
          value={state.codigo}
          name="codigo"
          onChange={this.handleChange}
          id="codigo"
          label="Código"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          required
          value={state.disciplina}
          name="disciplina"
          onChange={this.handleChange}
          id="disciplina"
          label="Disciplina"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <br />
        <TextField
          required
          value={state.horasSemanais}
          type="number"
          name="horasSemanais"
          onChange={this.handleChange}
          id="horasSemanais"
          label="Carga Horária"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </>);
  }
  render() {
    const { state } = this;
    const formsData = [
      <>
      {this.form1()}
        
      </>,
      <>
      {this.form1()}
      </>,
      <>
        <br />
        <Autocomplete
          id="tipoFuncao"
          options={tiposForm3}
          getOptionLabel={(option) => option.descricao}
          onChange={this.onChangeTipoFuncao}
          value={this.state.tipoFuncao}
          fullWidth
          renderInput={(params) => (
            <TextField required {...params} label="Tipo" variant="outlined" />
          )}
        />
        <br />
        <Autocomplete
          id="programa"
          options={programas}
          getOptionLabel={(option) => option.descricao}
          onChange={this.onChangePrograma}
          value={this.state.programa}
          fullWidth
          renderInput={(params) => (
            <TextField
              required
              {...params}
              label="Programa"
              variant="outlined"
            />
          )}
        />

        <TextField
          value={state.orientando}
          name="orientando"
          onChange={this.handleChange}
          id="orientando"
          label="Nome do Orientando"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          type="number"
          required
          value={state.horasSemanais}
          name="horasSemanais"
          onChange={this.handleChange}
          id="horasSemanais"
          label="Horas Semanais"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </>,
      <>
        <br />
        <Autocomplete
          id="tipoFuncao"
          options={tiposForm4}
          getOptionLabel={(option) => option.descricao}
          onChange={this.onChangeTipoFuncao}
          value={this.state.tipoFuncao}
          fullWidth
          renderInput={(params) => (
            <TextField required {...params} label="Tipo" variant="outlined" />
          )}
        />
        <TextField
        required
          type="date"
          value={state.dataAprovacao}
          name="dataAprovacao"
          onChange={this.handleChange}
          id="dataAprovacao"
          label="Data de Aprovação"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <br />
        <TextField
            required
          value={state.titulo}
          name="titulo"
          onChange={this.handleChange}
          id="titulo"
          label="Título"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
        required
        type="number"
          value={state.horasSemanais}
          name="horasSemanais"
          onChange={this.handleChange}
          id="horasSemanais"
          label="Horas Semanais"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </>,
      <>
        <br />
        <Autocomplete
        
          id="tipoFuncao"
          options={tiposForm4}
          getOptionLabel={(option) => option.descricao}
          onChange={this.onChangeTipoFuncao}
          value={this.state.tipoFuncao}
          fullWidth
          renderInput={(params) => (
            <TextField required {...params} label="Tipo" variant="outlined" />
          )}
        />
        <TextField
        required
        type="date"
          value={state.dataAprovacao}
          name="dataAprovacao"
          onChange={this.handleChange}
          id="dataAprovacao"
          label="Data de Aprovação"
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
            required
          value={state.titulo}
          name="titulo"
          onChange={this.handleChange}
          id="titulo"
          label="Título"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
            required
            type="number"
          value={state.horasSemanais}
          name="horasSemanais"
          onChange={this.handleChange}
          id="horasSemanais"
          label="Horas Semanais"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </>,
      <>
        <br />
        <TextField
        required
          value={state.numeroPortaria}
          name="numeroPortaria"
          onChange={this.handleChange}
          id="numeroPortaria"
          label="Nº da Portaria"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <br />
        <TextField
        required
        type="date"
          value={state.data}
          name="data"
          onChange={this.handleChange}
          id="data"
          label="Data"
          fullWidth
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
        required
          value={state.cargoFuncao}
          name="cargoFuncao"
          onChange={this.handleChange}
          id="cargoFuncao"
          label="Cargo ou Função"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
        required
        type="number"
          value={state.horasSemanais}
          name="horasSemanais"
          onChange={this.handleChange}
          id="horasSemanais"
          label="Horas Semanais"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </>,
      <>
        <br />
        <TextField
        required
          value={state.numeroPortaria}
          name="numeroPortaria"
          onChange={this.handleChange}
          id="numeroPortaria"
          label="Nº da Portaria"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <br />
        <TextField
        required
        type="date"
        InputLabelProps={{
            shrink: true,
          }}
          value={state.data}
          name="data"
          onChange={this.handleChange}
          id="data"
          label="Data"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
        required
          value={state.cargoFuncao}
          name="cargoFuncao"
          onChange={this.handleChange}
          id="cargoFuncao"
          label="Cargo ou Função"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
        required
        type="number"
          value={state.horasSemanais}
          name="horasSemanais"
          onChange={this.handleChange}
          id="horasSemanais"
          label="Horas Semanais"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </>,
    ];
    return (
      <>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.handleAdd();
          }}
        >
          <Autocomplete
            id="tipo-atividade"
            options={tiposAtividade}
            getOptionLabel={(option) => option.descricao}
            onChange={this.onTagsChange}
            value={this.state.tipo}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Atividade"
                variant="outlined"
              />
            )}
          />

          {this.state.tipo ? (
            formsData[this.state.tipo.id]
          ) : (
            <Typography variant="h4" component="h2">
              Selecione uma atividade
            </Typography>
          )}
        </form>

        <List>
          {this.context.data.map((atividade, index) => (
            <Element
              atividade={atividade}
              removeData={this.removeData}
              key={index}
            />
          ))}
        </List>
        {tiposAtividade.map((element, index)=> {
            
        })}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.props.aoEnviar();
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Avançar
          </Button>
        </form>
      </>
    );
  }
}
export default PanelData;
