import React, {Component} from 'react'
export default class VABReport extends Component{
  render() {
    return (
      <tr>
        <th>VAB</th>
      </tr>
    )
  }
}

// {reportedVABDays.length > 0 ?
//   <tr>
//     <th>VAB</th>
//   </tr> :
//   <tr/>
// }
// {reportedVABDays.map(function(day, index){
//   return <tr key={index}><td>{getformattedDate(day)}</td></tr>
// })}
