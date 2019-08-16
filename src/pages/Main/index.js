import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import moment from 'moment'

import { Container, Form} from './styles'
import CompareList from '../../components/CompareList/index'
import api from '../../services/api'

export default class Main extends Component {
state = {
    loading: false,
    repositoryError: false,
    repositoryInput : '',
    repositories : [],

}

handlerAddRepository = async (e) => {
    e.preventDefault()

    try {

        this.setState({
            loading: true,
        })
        const { data: repository} = await api.get(`/repos/${this.state.repositoryInput}`)

        repository.lastCommit = moment(repository.pushed_at).fromNow()

        this.setState({
        repositoryError: false,
        repositoryInput : '',    
        repositories : [...this.state.repositories, repository],
        })
    } catch (error) {
        this.setState({           
            repositoryError: true
        })
        console.log(error)
    } finally {
        this.setState({
            loading: false,           
        })
    }
}

    render() {
        return (
            <Container>
            <img src={logo} alt="Git Compare" />
    
            <Form withError= {this.state.repositoryError} onSubmit= {this.handlerAddRepository}>
                <input type="text" placeholder="usuário/repositório" 
                value= {this.state.repositoryInput}
                onChange= { e => this.setState({ repositoryInput: e.target.value})}/>
                <button type="submit">{this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
            </Form>
            <CompareList repositories= {this.state.repositories} />
        </Container>
        );
    }
}