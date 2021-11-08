import './Orders.css'
import '../Profile.css'

const Configurations = () => {

    let orders = [
        {
            number: "804686108",
            name: "Walter",
            ordered: "20 Oktober 2021",
            delivered: "25 Oktober 2021",
            price: "350,14 €",
            thumbnail: process.env.PUBLIC_URL+'/Assets/phone_placeholder.png',
            parts: ['memory','wifi','storage','battery_std','photo_camera']
        },

        {
            number: "123456789",
            name: "Norbert",
            ordered: "4 Juli 1988",
            delivered: "18 Oktober 2010",
            price: "666,14 €",
            thumbnail: process.env.PUBLIC_URL+'/Assets/phone_placeholder.png',
            parts: ['storage','storage','battery_std']
        }
    ]

    return (
        <div className="Orders pr-page">

            <h1 className="pr-title">Bestellungen</h1>

            {orders.map((order,index) =>{return(
                <div key={index} className="or-block">

                    <div className="or-row or-row-1">
                        <span className="or-date">{order.ordered}</span>
                        <span className="or-number">{'Bestellnummer '+order.number}</span>
                    </div>

                    <div className="or-row or-row-2">
                        <img src={order.thumbnail} alt="" />
                        <span className="or-info">
                            <span className="or-name">{order.name}</span>
                            <span>Zugestellt am</span>
                            <span className="or-delivered">{order.delivered}</span>
                        </span>
                        <span className="or-buttons">
                            <div className="or-button">Lieferung verfolgen</div>
                            <div className="or-button">Rechnung herunterladen</div>
                        </span> 
                    </div>

                    <div className="or-row or-row-3">
                        <span>Dieses Paket enthält:</span>
                        {order.parts.map((part,index) =>{return(
                            <span key={index} className="material-icons or-part-icon">{part}</span>
                        )})}
                        <span className="material-icons or-dorpDown-icon">keyboard_arrow_down</span>
                    </div>

                    <div className="or-row or-row-4">
                        <span>{'Gesamt: '+order.price}</span>
                    </div>

                </div>
            )})}

        </div>
    )
}

export default Configurations
