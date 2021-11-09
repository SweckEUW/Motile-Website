import './Overview.css';
import React from 'react';

function Overview(){

  return (
    <div className="Overview">

      <h2>Übersicht</h2>
      <h1>Rüdiger<span className="material-icons">edit</span></h1>
      <div class="box">
        <h3><span>Rückseite</span></h3>        
        <h4><span className="material-icons">memory</span>Soc<span className="price">50€</span></h4>
        <h3><span>Vorderseite</span></h3>
        <p>Gesamt 350€</p>
      </div>

     
    </div>
  );
}

export default Overview;
