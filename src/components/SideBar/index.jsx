import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import RcIf from 'rc-if';
import RegisterModal from "../RegisterModal";
import './styles.scss';

function Sidebar({ listItem, addListItem }) {
    const [registerModal, setRegisterModal] = useState(false);

    const openRegisterModal = () => { setRegisterModal(true) };
    const closeRegisterModal = () => { setRegisterModal(false) };
    return (
        <section class="sidebar-container">
            <div class="header">
                <Link to="/">
                    <h2>TO DO LIST</h2>
                    <p>Developed by Victor Stassun</p>
                </Link>
            </div>

            <div class="add-new-item" onClick={openRegisterModal}>
                <FontAwesomeIcon icon={faPlus} />
                <h3>Add new item</h3>
            </div>
            <div class="filters">
                <h1>Filters:</h1>
                <ul class="filters-list">
                    <li class="links">
                        <Link to="/not-started">
                            Not started
                        </Link>
                    </li>
                    <li class="links">
                        <Link to="/in-progress">
                            In progress
                        </Link>
                    </li>
                    <li class="links">
                        <Link to="/finished">
                            Finished
                        </Link>
                    </li>
                </ul>
            </div>
            <RcIf if={registerModal}>
                <RegisterModal addListItem={addListItem} closeRegisterModal={closeRegisterModal} listItem={listItem} />
            </RcIf>
        </section>
    );
}

export default Sidebar;