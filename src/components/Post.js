import {Component} from 'react';
import PDF from './PDF';

class Post extends Component{
    state = {
        title: '',
        content: '',
        image: '',
        postSubmitted: false
    }

    onChange = input => e => {
        this.setState({[input]: e.target.value});
    }
    submitPost = (e) => {
        if(!this.state.title || !this.state.content){
            alert("Todos os campos são obrigatórios!");
            e.preventDefault();
        }else{
            this.setState({
                postSubmitted: true
            });
        }


    } 
    render(){
        return (
            <>
                { 
                !this.state.postSubmitted ?
                    (

                    <div className="container">
                    <div className="jumbotron mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="well well-sm">
                                    <form className="form-horizontal" method="post">
                                        <fieldset>
                                            <legend className="text-center header">Add new Post</legend>
                                            <div className="form-group">
                                                <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                                <input onChange={this.onChange('title')} name="title" type="text" placeholder="Seu Nome" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-pencil-square-o bigicon"></i></span>
                                                <input  onChange={this.onChange('image')} name="image" type="text" placeholder="Selecione o Semestre" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-pencil-square-o bigicon"></i></span>
                                                <textarea  onChange={this.onChange('content')} name="content" type="text" placeholder="Escreva uma observação" className="form-control" rows="7"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <button onClick={this.submitPost} type="button" className="btn btn-primary btn-lg">Enviar</button>
                                            </div>

                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>): (
                    <PDF title={this.state.title} content={this.state.content} image={this.state.image} />
                )
                }
                
                
            </>
        );
    }
}
export default Post;