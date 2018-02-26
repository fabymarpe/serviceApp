import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ServicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            descriptionService: '',
            addressOne: '',
            addressTwo: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {descriptionService, addressOne, addressTwo} = this.state;
        const {dispatch} = this.props;
        if (addressOne && addressTwo) {
            dispatch(userActions.createService(addressOne, addressTwo));
        }
    }

    render() {
        const { user, service } = this.props;
        const { descriptionService, addressOne, addressTwo, submitted } = this.state;
        return (
            <div className="col-md-12">
                <h1>Hi {user.firstName}!</h1>
                <form name="form">
                    <div className={'form-group' + (submitted && !descriptionService ? ' has-error' : '')}>
                        <label htmlFor="username">Descripción</label>
                        <textarea type="text" className="form-control" name="descriptionService"
                                  value={descriptionService} onChange={this.handleChange} rows='5'/>
                        {submitted && !descriptionService &&
                        <div className="help-block">Descripción es requerido</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !addressOne ? ' has-error' : '')}>
                        <label htmlFor="password">Dirección origen</label>
                        <input type="text" className="form-control" name="addressOne" value={addressOne}
                               onChange={this.handleChange} onBlur={this.handleSubmit}/>
                        {submitted && !addressOne &&
                        <div className="help-block">Dirección de origen es requerida</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !addressTwo ? ' has-error' : '')}>
                        <label htmlFor="password">Dirección destino</label>
                        <input type="text" className="form-control" name="addressTwo" value={addressTwo} onChange={this.handleChange}
                        onBlur={this.handleSubmit}/>
                        {submitted && !addressTwo &&
                        <div className="help-block">Dirección de destino es requerida</div>
                        }
                    </div>
                </form>
                <div>
                    <div>
                        {submitted && !service.duration && !service.distance &&
                        <div className="help-block">Calculando la duración y distancia...</div>
                        }
                    </div>
                    <div>
                        {submitted && service.duration && service.distance &&
                        <div>
                            <label htmlFor="password">Tiempo estimado:</label> { service.duration }
                            <br/>
                            <label htmlFor="password">Distancia:</label> { service.distance }
                        </div>
                        }
                    </div>
                </div>
                <p>
                    <Link to="/login"> <button className="btn btn-primary">Logout</button></Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { service, authentication } = state;
    const { user } = authentication;
    return {
        user,
        service
    };
}

const connectedServicePage = connect(mapStateToProps)(ServicePage);
export { connectedServicePage as ServicePage };