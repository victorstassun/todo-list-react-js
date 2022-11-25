import { faForward, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RcIf from 'rc-if';
import './styles.scss';

function Modal({ listItem, closeModal, changeStatus, deleteListItem }) {
    const statusText = (status) => {
        if (status === 'not-started')
            return 'Not started';
        else if (status === 'in-progress')
            return 'In progress'
        else 
            return 'Finished'
    }
    return (
        <div class="modal-container">
            <div class="modal">
                <div class="modal-infos">
                    <h1 class="modal-title">{listItem.text}</h1>
                    <div class="description">
                        <p class="description-title">Description</p>
                        <RcIf if={listItem.description === null}>
                            <p class="description-text-not-found">No description found.</p>
                        </RcIf>
                        <p class="description-text">{listItem.description}</p>
                    </div>
                </div>
                <div class="modal-actions">
                    <span class="close-option">
                        <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
                        {statusText}
                    </span>
                    <div class="status-indicator">
                        <h3>Status:</h3>
                        <p>{statusText(listItem.status)}</p>
                    </div>
                    <div class="move-card" onClick={() => changeStatus(listItem)} > 
                    <FontAwesomeIcon icon={faForward} />
                        <p>Move card</p>
                    </div>
                    <div class="delete-card" onClick={() => deleteListItem(listItem.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        <p>Delete card</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;