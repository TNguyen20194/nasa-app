export default function SideBar(props) {
    const { handleSideBarClick, data } = props;

    return (
        <div className="sidebar">
            <div className="bgOverlay" onClick={handleSideBarClick}></div>
            <div className="sidebarContents">
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
                <button onClick={handleSideBarClick}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
}