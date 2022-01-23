import '../SettingModals.css'
import {CSSTransition} from 'react-transition-group';
import React, { useState, useCallback } from 'react';
import ServerRequest from '../../../../services/ServerRequest';

const EditProfile = (props) => {
    const [editProfileDialogueVisible, setEditProfileDialogueVisible] = useState(false);
    const [profilePicData, setProfilePicData] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    document.addEventListener("toggleEditProfileDialogue", toggleEditProfileDialogue);
    function toggleEditProfileDialogue() {
        setEditProfileDialogueVisible(!editProfileDialogueVisible);
        setProfilePic(null);
        setProfilePicData(null);
    }

    async function changeProfileData() {
        let firstName = document.getElementById("st-mod-firstname").value
        let lastName = document.getElementById("st-mod-lastname").value
        let email = document.getElementById("st-mod-email").value.toLowerCase();
        let telephone = document.getElementById("st-mod-telefon").value;

        let changeUserDataRequest = await ServerRequest.changeUserData({
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone
        })

        if(profilePicData)
            await sendImage();
        
        props.updateState(state => ({...state}));
        toggleEditProfileDialogue();
    }

    async function sendImage(){
        const data = new FormData();
        data.append('file', profilePicData);
        let uploadImageResponse = await ServerRequest.uploadImage(data);
        console.log(uploadImageResponse.data.message);
    }

    return (
        <div className="EditProfile">
            <CSSTransition in={editProfileDialogueVisible} classNames="fade" timeout={400} unmountOnExit>
                <div className="st-mod-dialogue">
                    <div className="st-mod-container">
                        <h1 className="st-mod-title">Profil bearbeiten</h1>
                        <div className="st-mod-profile-pic">
                            <div className="st-mod-edit-pic" >
                                <input type="file" className="st-mod-select-pic" id="newProfilePic" name="file" accept="image/*" onChange={event => {
                                    const file = event.target.files[0];
                                    setProfilePic(URL.createObjectURL(file));
                                    setProfilePicData(file);
                                }}/>
                                <img src={profilePic || props.userData && props.userData.profilePic} alt="" />
                            </div> 
                        </div>

                        <div className="st-mod-close-button" onClick={() =>{toggleEditProfileDialogue()}}>
                            <span className="material-icons">close</span>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">Vorname</p>
                            </div>
                            <input id="st-mod-firstname" className="st-mod-form-input" type="text" defaultValue={props.userData && props.userData.firstName}/>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">Nachname</p>
                            </div>
                            <input id="st-mod-lastname" className="st-mod-form-input" type="text" defaultValue={props.userData && props.userData.lastName}/>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">E-Mail</p>
                            </div>
                            <input id="st-mod-email" className="st-mod-form-input" type="text" defaultValue={props.userData && props.userData.email}/>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">Telefon</p>
                            </div>
                            <input id="st-mod-telefon" className="st-mod-form-input" type="text" defaultValue={props.userData && props.userData.telephone}/>
                        </div>

                        <div className="st-mod-confirm"  onClick={() =>{changeProfileData()}}>
                            <span>Speichern</span>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default EditProfile
