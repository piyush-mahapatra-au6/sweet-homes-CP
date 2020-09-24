import React, { Fragment, Component } from "react";

export default class Ownerlayout extends Component {
  render() {
    // console.log(this.props);
    return (
      <Fragment>
        <div class="jumbotron">
          <div class="row">
            <div class="col-sm">
              <h1 class="display-4">{this.props.headline}</h1>
              <p class="lead">{this.props.value}</p>
              <hr class="my-4" />
            </div>
            <div class="col-sm">
              <h1 class="display-4">{this.props.headline2}</h1>
              <p class="lead">{this.props.value2}</p>
              <hr class="my-4" />
            </div>
            <div class="col-sm">
              <h1 class="display-4">{this.props.headline3}</h1>
              <p class="lead">{this.props.value3}</p>
              <hr class="my-4" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
