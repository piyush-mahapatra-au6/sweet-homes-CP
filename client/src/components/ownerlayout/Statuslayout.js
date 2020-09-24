import React, { Fragment, Component } from 'react'
export default class Statuslayout extends Component {
    render() {
     
        return (
            <Fragment>
                <div class="jumbotron">
                <div class="row">
              <div class="col-sm">
                            <h1 class="display-4">{this.props.headline}</h1>
                <p class="lead">{this.props.value}</p>
              </div>
                   
            </div>
                </div>
                
            </Fragment>
        )
    }
}
