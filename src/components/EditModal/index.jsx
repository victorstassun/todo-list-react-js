import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

function EditModal({ closeEditModal, listItem }) {
    
    const statusText = (status) => {
        if (status === 'not-started')
            return 'Not started';
        else if (status === 'in-progress')
            return 'In progress'
        else 
            return 'Finished'
    }

    function onChange(ev) {
        const {name, value} = ev.target;

        return editedForm(name, value);
    };

    const editedForm = (field, newTitle) => {
        if (newTitle === '') 
            return listItem;

        listItem[field] = newTitle;

        return listItem;
    }

    return (
        <div class="edit-modal-container">
            <div class="modal">
                <div class="modal-infos">
                    <input type="text" name="text" placeholder={listItem.text} class="modal-title" onChange={onChange} />
                    <div class="description">
                        <p class="description-title">Description</p>
                        <textarea type="text" name="description" placeholder={listItem.description} class="description-text" onChange={onChange} />
                    </div>
                </div>
                <div class="modal-actions">
                    <span class="close-option">
                        <FontAwesomeIcon icon={faXmark} onClick={closeEditModal} />
                    </span>
                    <div class="status-indicator">
                        <h3>Status:</h3>
                        <p>{statusText(listItem.status)}</p>
                    </div>
                    <div class="add-new-item" onClick={closeEditModal}>
                        <FontAwesomeIcon icon={faSave} />
                        <p>Confirm</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;