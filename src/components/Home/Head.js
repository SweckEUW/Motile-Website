import './Head.css'
import {React, useState} from 'react'

const Head = () => {
  const [mainInfo, setMainInfo] = useState(<p>Motile <br/> Ein vollständig modulares Smartphone. Nachhaltig, individuell und aufrüstbar.</p>);

    return (
        <div className="head">
            <div className="head-main">
                <div className="head-overlay">
                    {mainInfo}
                    <button>Jetzt zusammenstellen</button>
                </div>
            </div>
        </div>
    )
}

export default Head
