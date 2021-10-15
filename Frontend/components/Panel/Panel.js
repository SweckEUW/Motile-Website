import './Panel.css';
import React, {useState ,useEffect} from 'react';
import MotileParts from '../../services/MotileParts';

function Panel(){
  const [motileParts, setMotileParts] = useState([]);

  useEffect(() =>{ 
    retrieveMotileParts();
  }, []);

  const retrieveMotileParts = () =>{
    MotileParts.getAll().then(response => {
      setMotileParts(response.data)
    })
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
