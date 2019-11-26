import React from 'react';
import PowerIcon from 'react-icons/lib/go/zap';

const PoweredBy = (props) => {
    return (
        <div className="ori-animated ori-fade-in-up" >
            <PowerIcon size={11} className="ori-font-danger"/>
            <span className="ori-font-xxs ori-font-light" > by</span >
            <a href={props.target_url} target="blank" className="ori-font-xxs" >
                <img src={props.logo_url} className="ori-l-mrgn-5 ori-height-10 ori-cursor-ptr" alt="" />
            </a >
        </div >
    );
};

export default PoweredBy;