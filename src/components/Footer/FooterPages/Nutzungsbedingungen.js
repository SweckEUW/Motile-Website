import React from 'react';
import './FooterPages.css';

const Nutzungsbedingungen = () => {

    return (
        <div className="FooterPages Nutzungsbedingungen grid-container">
            <div className="col-12">
                <h1>Nutzungsbedingungen</h1>
                <h2>Prerequisites</h2>
                <li>You will need <a href="https://nodejs.org">Node.js</a> installed on your system.</li>
                <li>You will need <a href="https://git-scm.com/downloads">git</a> installed on your system.</li>
                <li>You will need <a href="https://code.visualstudio.com/Download">Visual Studio Code</a> installed on your system.</li>
                <li>You will need <a href="https://www.blender.org/download/">Blender</a> installed on your system. Change Blender instalation Path inside: Backend/server/config.js</li>
                <li>You will need <a href="https://www.mongodb.com/try/download/community">MongoDB</a> installed on your system. Stop Mongodb server on Windows startup:<br/>*Search for services.msc in Windows and look for your "MongoDB Server (MongoDB)". Right click - properties - change start type to manually*</li>

                <h2>Setup</h2>
                <li>Once downloaded, open the terminal in the project directory, and continue with: <em>npm install</em></li>
                <li>Compiles and hot-reloads for development (Live Server) - Starts React,Nodejs,Mongodb : <em>npm run serve</em></li>
            </div>
        </div>
    )
}

export default Nutzungsbedingungen;