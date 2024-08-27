export default function SideBar(props) {
    const {handleToggleModal} = props
    return (
        <div className="sidebar">
            <div className="bgOverlay" onClick={handleToggleModal}></div>
            <div className="sidebarContents">
                <h2>The Brutal Matian Landscape</h2>
                <div>
                    <p>Description</p>
                    <p>alsdkjas kajdlaskd</p>
                </div>
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}