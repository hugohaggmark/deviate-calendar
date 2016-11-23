import React, {Component} from 'react'

export default class Modal extends Component {
  render(){
    const {title, body, okLabel, okAction} = this.props
    return(
      <div id="myModal" className="modal fade" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <p>{body}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => okAction()}>{okLabel}</button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Avbryt</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
