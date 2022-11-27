import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import RcIf from 'rc-if';
import EditModal from '../../components/EditModal';
import './styles.scss';

function FilteredListPage({ filteredItems, status, deleteListItem }) {
    const [itemFilteredEditModal, setItemFilteredEditModal] = useState([]);
    const [filteredEditModal, setFilteredEditModal] = useState(false);

    const changeModalView = (filteredItem) => {
        setItemFilteredEditModal(filteredItem);

        setFilteredEditModal(!filteredEditModal);
    };


    return (
        <div class="container-filtered-list-page">
            <div class="list-filtered-items">
                <div class="page-title">
                    <h1>{status}</h1>
                </div>
                <div class="cards-container">
                    {filteredItems.map(filteredItem => (
                        <div class="card">
                            <div class="badge-container">
                                <div class={'status badge-' + filteredItem.status} />
                            </div>
                            <div class="info-container">
                                <h1>{filteredItem.text}</h1>
                                <p>{filteredItem.description || 'No description.'}</p>
                            </div>
                            <div class="actions-container">
                                <FontAwesomeIcon icon={faPencil} onClick={() => changeModalView(filteredItem)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteListItem(filteredItem.id)} />
                            </div>
                        </div>
                    )
                    )}
                </div>

            </div>
            <RcIf if={filteredEditModal}>
                <EditModal closeEditModal={changeModalView} listItem={itemFilteredEditModal} />
            </RcIf>
        </div>
    );
}

export default FilteredListPage;