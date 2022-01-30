import React from 'react';
import './FooterPages.css';

const Impressum = () => {

    return (
        <div className="FooterPages Impressum grid-container">
            <div className="col-12">
                <h1>Impressum</h1>
                <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
                <p>Motile GmbH<br />
                An der Zapfs&auml;ule 69<br />
                Geb&auml;ude 44<br />
                90210 Musterstadt</p>

                <p><strong>Vertreten durch:</strong><br />
                Dr. Harry Mustermann<br />
                Luise Beispiel</p>

                <p><strong>Vorsitzender des Aufsichtsrats:</strong><br />
                Richard Amtmann</p>

                <h2>Kontakt</h2>
                <p>Telefon: +49 (0) 123 44 55 66<br />
                Telefax: +49 (0) 123 44 55 99<br />
                E-Mail: mustermann@musterfirma.de</p>

                <h2>Umsatzsteuer-ID</h2>
                <p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
                DE999999999</p>

                <h2>Verbraucher&shy;streit&shy;beilegung/<br/>Universal&shy;schlichtungs&shy;stelle</h2>
                <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                
                <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p>
            </div>
        </div>
    )
}

export default Impressum;