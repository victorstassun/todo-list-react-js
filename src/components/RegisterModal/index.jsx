import { useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';


function RegisterModal({ closeRegisterModal, addListItem, listItem }) {
    const [text, setText] = useState(null);
    const [desc, setDesc] = useState(null);
    const [status] = useState('not-started');

    const createListItem = () => {
        if (text === null)
            return alert("Insert a title!");
        else {
            const getLastId = listItem.length <= 0 ?  0 : (listItem[listItem.length-1].id + 1);
            const listItemObj = { text: text, id: Number(getLastId), status: status, description: desc };

            addListItem(listItemObj);
        };
    };

    return (
        <div class="modal-container">
            <div class="modal">
                <div class="modal-infos">
                    <input type="text" name="text" placeholder="Insert title..." class="modal-title" onChange={e => setText(e.target.value)} />
                    <div class="description">
                        <p class="description-title">Description</p>
                        <textarea type="text" name="description" placeholder="Insert description..." class="description-text" onChange={e => setDesc(e.target.value)} />
                    </div>
                </div>
                <div class="modal-actions">
                    <span class="close-option">
                        <FontAwesomeIcon icon={faXmark} onClick={closeRegisterModal} />
                    </span>
                    <div class="status-indicator">
                        <h3>Status:</h3>
                        <p>Registering</p>
                    </div>
                    <div class="save-new-item" onClick={createListItem}>
                        <FontAwesomeIcon icon={faSave} />
                        <p>Create item</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;