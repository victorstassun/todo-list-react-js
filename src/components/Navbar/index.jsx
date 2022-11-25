import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import RcIf from 'rc-if';
import RegisterModal from "../RegisterModal";
import './styles.scss';

function Navbar({ addListItem, listItems }) {
    const [registerModal, setRegisterModal] = useState(false);

    const openRegisterModal = () => { setRegisterModal(true) };
    const closeRegisterModal = () => { setRegisterModal(false) };

    return (
        <div class="actions-bar">
            <div class="add-new-item" onClick={openRegisterModal}>
                <FontAwesomeIcon icon={faPlus} />
                <h3>Add new item</h3>
            </div>
            <div class="filters">
                <h3>Filters: </h3>
                <ul class="filters-list">
                    <li>
                        <Link to="/">
                            All items
                        </Link>
                    </li>
                    <li>
                        <Link to="/not-started">
                            Not started
                        </Link>
                    </li>
                    <li>
                        <Link to="/in-progress">
                            In progress
                        </Link>
                    </li>
                    <li>
                        <Link to="/finished">
                            Finished
                        </Link>
                    </li>
                </ul>
            </div>
            <RcIf if={registerModal}>
                <RegisterModal addListItem={addListItem} closeRegisterModal={closeRegisterModal} listItem={listItems} />
            </RcIf>
        </div>
    );
}

export default Navbar;