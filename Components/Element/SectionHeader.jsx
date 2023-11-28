const SectionHeader = (props) => {
    const { title = '', subTitle = '', customeclass = '' } = props;
    return (
        <div className={`${customeclass ? 'title title-2 text-lg-start text-md-center' : 'title title-2 text-center'}`}>
            <h3 style={{fontSize:"calc(22px + 6 * (100vw - 320px) / 1600)"}}>{title}</h3>
                <div className="text-div-after-h">
                <div className="text-div-after-h-red"/>
            </div>
        </div >

    );
};
export default SectionHeader;