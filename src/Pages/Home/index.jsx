import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import RcIf from 'rc-if';
import EditModal from '../../components/EditModal';
import Modal from "../../components/Modal";
import './styles.scss';

function Home({ deleteListItem, addListItem, listItems }) {
    const [editModal, setEditModal] = useState(false);
    const [editModalItem, setEditModalItem] = useState([]);

    const [modal, setModal] = useState(false);
    const [modalItem, setModalItem] = useState(false);

    const openEditModal = (item) => { 
        setEditModalItem(item);
        setEditModal(true)
    };

    const closeEditModal = () => { setEditModal(false) };

    const openModal = (item) => { 
        setModalItem(item); 
        setModal(true) 
    };

    const closeModal = () => { setModal(false) };

    const nextStep = (status) => {
        if (status === 'not-started')
            return 'in-progress';

        if (status === 'in-progress')
            return 'finished'
    }

    const changeStatus = (listItem) => {
        nextStep(listItem.status);

        const statusUpdate = listItem.status = nextStep(listItem.status);

        deleteListItem(listItem.id)

        addListItem(statusUpdate)
    };

    const dragStart = (e, listItem) => {
        const JSONListItem = JSON.stringify(listItem);

        e.dataTransfer.setData("listItem", JSONListItem);
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragDrop = (e, itemStatus) => {
        e.preventDefault();

        let listItem = JSON.parse(e.dataTransfer.getData("listItem"));

        const listItemFind = listItems.find(item => item.id === listItem.id);
        listItemFind.status = itemStatus;

        const listItemIndex = listItems.findIndex(item => item.id === listItem.id)

        listItems.splice(listItemIndex, 1);

        addListItem(listItemFind);
    };

    return (
        <div class="content">
            <div class="main-page">
                <div class="lists-container">
                    <div class="list-container" droppable onDragOver={e => dragOver(e)} onDrop={e => dragDrop(e, 'not-started')}>
                        <div class="list-header">
                            <p>Not Started</p>
                        </div>
                        <div class="list">
                            {listItems.filter((listItem) => listItem.status === 'not-started')
                                .map(filteredItem => (
                                    <div>
                                        <div draggable onDragStart={(e) => dragStart(e, filteredItem)} class="list-item-container">
                                            <div class="badge-container">
                                                <div class={'status badge-' + filteredItem.status} />
                                            </div>
                                            <div onClick={() => openModal(filteredItem)} class={'list-item-title-' + filteredItem.status}>
                                                <p>{filteredItem.text}</p>
                                            </div>
                                            <div class="action-icons">
                                                <FontAwesomeIcon icon={faPencil} onClick={() => openEditModal(filteredItem)} />
                                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteListItem(filteredItem.id)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div droppable onDragOver={e => dragOver(e)} onDrop={e => dragDrop(e, 'in-progress')} class="list-container">
                        <div class="list-header">
                            <p>In progress</p>
                        </div>
                        <div class="list">
                            {listItems.filter((listItem) => listItem.status === 'in-progress')
                                .map(filteredItem => (
                                    <div>
                                        <div draggable onDragStart={(e) => dragStart(e, filteredItem)} class="list-item-container">
                                            <div class="badge-container">
                                                <div class={'status badge-' + filteredItem.status} />
                                            </div>
                                            <div onClick={() => openModal(filteredItem)} class={'list-item-title-' + filteredItem.status}>
                                                <p>{filteredItem.text}</p>
                                            </div>
                                            <div class="action-icons">
                                                <FontAwesomeIcon icon={faPencil} onClick={() => openEditModal(filteredItem)} />
                                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteListItem(filteredItem.id)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div class="list-container" droppable onDragOver={e => dragOver(e)} onDrop={e => dragDrop(e, 'finished')}>
                        <div class="list-header">
                            <p>Finished</p>
                        </div>
                        <div class="list">
                            {listItems.filter((listItem) => listItem.status === 'finished')
                                .map(filteredItem => (
                                    <div>
                                        <div draggable onDragStart={(e) => dragStart(e, filteredItem)} class="list-item-container">
                                            <div class="badge-container">
                                                <div class={'status badge-' + filteredItem.status} />
                                            </div>
                                            <div onClick={() => openModal(filteredItem)} class={'list-item-title-' + filteredItem.status}>
                                                <p>{filteredItem.text}</p>
                                            </div>
                                            <div class="action-icons">
                                                <FontAwesomeIcon icon={faPencil} onClick={() => openEditModal(filteredItem)} />
                                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteListItem(filteredItem.id)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <RcIf if={editModal}>
                <EditModal closeEditModal={closeEditModal} listItem={editModalItem} />
            </RcIf>
            <RcIf if={modal}>
                <Modal closeModal={closeModal} changeStatus={changeStatus} deleteListItem={deleteListItem} listItem={modalItem} />
            </RcIf>
        </div>
    );
}

export default Home;