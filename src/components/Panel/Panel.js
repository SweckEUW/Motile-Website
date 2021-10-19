import './Panel.css';
import React, {useState ,useEffect} from 'react';
import ServerRequest from '../../services/ServerRequest';

function Panel(){
  const [motileParts, setMotileParts] = useState([]);

  useEffect(() =>{ 
    getMotileParts();
  }, []);

  async function getMotileParts(){
    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    setMotileParts(motilePartsResponse.data)
  }

  return (
    <div className="Panel">
      <h1>My Panel</h1>
      <div>
        {motileParts.map((motilePart,index) =>{
          return(
            <h2 key={index}>{motilePart.name}</h2>
          )
        })}
      </div>
    </div>
  );
}

export default Panel;
