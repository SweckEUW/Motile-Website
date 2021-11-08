import './Settings.css'
import '../Profile.css'

const Configurations = () => {
  
    let addresses = [
        {
            forename: "Anna",
            surname: "Tanke",
            street: "An der Zapsäule 69",
            city: "59557 Lippstadt",
            country: "Deutschland",
            telephone: "+49 1575 0456123"
        },

        {
            forename: "Nick",
            surname: "Dieter",
            street: "Nice street 123",
            city: "12345 Westhausen",
            country: "Griechenland",
            telephone: "+49 3451 145212"
        }
    ]

    return (
        <div className="Settings pr-page">

            <h1 className="pr-title">Einstellungen</h1>
            
            <div className="st-block">
                <div className="st-setting st-account">Kontoinformationen</div>
                <div className="st-setting st-payment">Zahlungsmethoden</div>
                <div className="st-setting">
                    <span>Adressen</span>
                    <div className="st-adresses">
                        {addresses.map((adress,index) =>{return(
                            <span key={index} className="st-adress-element">
                                <div>{adress.forename + ' ' + adress.surname}</div>
                                <div>{adress.street}</div>
                                <div>{adress.city}</div>
                                <div>{adress.country}</div>
                                <div>{adress.telephone}</div>
                                <div className="st-hr"/>
                                <div className="st-delete">
                                    <span className="material-icons">delete</span>
                                    <span>Entfernen</span>
                                </div>
                            </span>
                        )})}
                        <span className="st-adress-element st-addAdress">+ Neue Adresse hinzufügen</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configurations
