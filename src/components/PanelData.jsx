import { Button, TextField, Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { DataContext } from "../services/DataContext";
import List from "@material-ui/core/List";
import Element from "../components/Element";

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
  { descricao: "TCC de graduação ou pós-graduação"},
  { descricao: "Supervisão de estágio"}
];

const tiposAtividade = [
  { descricao: "ENSINO DE GRADUAÇÃO", id: 0, minimo: 4, maximo: 20 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU", id: 1, minimo: 0, maximo: 16 },
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
      errosData : {horas: { valido: true, texto: "" }},
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
    this.showTableError = this.showTableError.bind(this);
    this.possoEnviar = this.possoEnviar.bind(this);
    this.validarHoras = this.validarHoras.bind(this);
  }
  validarHoras(event){

    if(event.target.value > 0 && event.target.value <= 10){
      this.setState({errosData : {horas: { valido: true, texto: "" }}});
    }else{
      this.setState({errosData : {horas: { valido: false, texto: "Digite um valor até 10" }}});
    }
  }
  removeData(itemId) {
    

    let arrayData = this.context.data;
    let dataIndex = arrayData.findIndex((atividade) => atividade.id === itemId);
    arrayData.splice(dataIndex, 1);
    this.context.data = arrayData;

    this.setState({
      errosData : {horas: { valido: true, texto: "" }},
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
          error={!this.state.errosData.horas.valido}
          helperText={this.state.errosData.horas.texto} 
          onBlur={this.validarHoras}
          step="0.5"
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

  showTableError(contextType){
    const data = contextType.data;
    var subtotal = 0;
    var subTotalEnsino = 0; 
    var subTotalGraduacao = 0; 
    var subTotalPos = 0; 
    var subTotalComplementar = 0; 
    var subTotalPesquisa = 0; //Max 20
    var subTotalExtensao = 0; //Max 20
    var subTotalGestao = 0; //Max 40
    var subTotalOutras = 0; //Max 8
    const erros = [];
    data.map(function(element) {
      if(element.tipo.id === 0){
        subTotalGraduacao += 2*parseFloat(element.horasSemanais);
        subtotal += 2*parseFloat(element.horasSemanais);
        subTotalEnsino += 2*parseFloat(element.horasSemanais);
        
      }else if(element.tipo.id === 1){
        subTotalPos += 2*parseFloat(element.horasSemanais);
        subtotal += 2*parseFloat(element.horasSemanais);
        subTotalEnsino += 2*parseFloat(element.horasSemanais);
      } else if(element.tipo.id === 2){
        subtotal += parseFloat(element.horasSemanais);
        subTotalComplementar += parseFloat(element.horasSemanais);
        subTotalEnsino += parseFloat(element.horasSemanais);
      }
      else if(element.tipo.id === 3){
        subtotal += parseFloat(element.horasSemanais);
        subTotalPesquisa += parseFloat(element.horasSemanais);
      }else if(element.tipo.id === 4){
        subtotal += parseFloat(element.horasSemanais);
        subTotalExtensao+= parseFloat(element.horasSemanais);
      } else if(element.tipo.id === 5){
        subtotal += parseFloat(element.horasSemanais);
        subTotalGestao += parseFloat(element.horasSemanais);
      } else if(element.tipo.id === 6){
        subtotal += parseFloat(element.horasSemanais);
        subTotalOutras += parseFloat(element.horasSemanais);
      }


      return subtotal;
      
    });
    subtotal = parseFloat(subtotal);

    if(contextType.regime.descricao === "20 horas"){
      const falta = 20-subtotal;  
      const sobra =  subtotal - 20;
      if(subtotal < 20){
        erros.push({text: "Ainda faltam "+falta.toFixed(2)+" horas."});
      } else if(subtotal > 20){
        erros.push({text: "Você adicionou mais de 20 horas, "+sobra.toFixed(2)+" horas em excedente."});
      }
    }else{
      const falta = 40-subtotal;
      const sobra =  subtotal - 40;
      if(subtotal < 40){
        erros.push({text: "Você não adicionou as 40 horas, faltam "+falta.toFixed(2)+" horas."});
      } else if(subtotal > 40){
        erros.push({text: "Você adicionou mais de 40 horas, "+sobra.toFixed(2)+" horas em excedente."});
      }
      
    }
    if(subTotalEnsino < 8){
      erros.push({text: "Carga Horária para Ensino abaixo da mínima."});
    }else if(subTotalEnsino > 20){
      erros.push({text: "Carga Horária para ensino acima de 20h"});
    }
    if(subTotalGraduacao < 4){
      erros.push({text: "Adicione no mínimo 4 horas para ensino de graduação."});
    }
    if(subTotalPos > 16){
      erros.push({text: "Você adicionou mais de 16 horas para pos."});
    }
    
    if(subTotalGestao > 40){
      erros.push({text: "Você adicionou mais de 40 horas para outras atividades de gestão."});
    }
    if(subTotalExtensao > 20){
      erros.push({text: "Você adicionou mais de 20 horas para outras atividades de extensão."});
    }
    if(subTotalOutras > 8){
      erros.push({text: "Você adicionou mais de 8 horas para outras atividades relevantes."});
    }
    
    return (

        <div>

  
              {erros.map((element, index) => (
                <Alert severity="warning" key={index}>{element.text}</Alert>
              ))}
              <br/>
              <Button type="submit" variant="contained" color="primary">
                Avançar
              </Button>
        </div>
  

    );
  
  }
  possoEnviar() {
    const erros = this.state.errosData;
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }
    return true;
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
        <br/>
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
            if (this.possoEnviar()) {
              this.handleAdd();
            }
            
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
            <br/><hr/>
        <List>
          {this.context.data.map((atividade, index) => (
            <Element
              atividade={atividade}
              removeData={this.removeData}
              key={index}
            />
          ))}
        </List>



        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.props.aoEnviar();
          }}
        >
          <hr/>
          {this.showTableError(this.context)}
         
        </form>
      </>
    );
  }
}
export default PanelData;
