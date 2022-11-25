import './styles.scss'

function FilteredListPage({ filteredItems, status }) {
    return (
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
                    </div>
                )
                )}
            </div>
        </div>
    );
}

export default FilteredListPage;