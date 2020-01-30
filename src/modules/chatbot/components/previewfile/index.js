import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';

import DelayComponent from '../../../../components/delaycomponent';

class PreviewFile extends React.PureComponent {
    componentWillUnmount() {
        this.props.onFileRemove();
    };

    renderImage = () => {
        const { file, fileUrl } = this.props;
        if (file && file.type && file.type.indexOf('image/') !== -1) {
            return (
                <div className="ori-bg-size-cover ori-bg-no-repeat" style={{ backgroundImage: `url(${fileUrl})`, height: '200px' }} />
            );
        } else {
            return (
                <div className="ori-pad-10 ori-flex-row ori-flex-center ori-font-light" style={{ fontSize: '3rem', height: '150px' }}>
                  file has been selected
                </div>
            )
        }
    };

    render() {
        const { isMounted, file, fileUrl, is_socket_connected, onClickCancel, onClickSend } = this.props;
        return (
            <div className={classNames("ori-absolute ori-animated ori-animation-half ori-bg-black-light ori-align-full ori-z-index-99995 ori-pad-20 ori-flex-column ori-flex-center", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted })}>
                <div className="ori-border-radius-light ori-border-radius-5 ori-bg-white ori-b-mrgn-10 ori-overflow-hidden ori-bg-position-center ori-full-width">
                    {this.renderImage()}
                    {
                        file &&
                        <div className="ori-pad-5 ori-overflow-hidden">
                            <a className="ori-text-overflow-dotted ori-font-default-hover-primary" href={fileUrl} target="_blank" rel="noopener noreferrer">{file.name}</a>
                        </div>
                    }
                </div>
                <div className="ori-flex-row ori-flex-jc ori-t-pad-15">
                    <Button className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-ghost-primary" size="small" onClick={onClickCancel}>Cancel</Button>
                    <Button className={classNames("ori-lr-mrgn-10 ori-lr-pad-20", { "ori-btn-fill-primary": is_socket_connected })} size="small" disabled={!is_socket_connected} onClick={onClickSend}>{is_socket_connected ? 'Send' : "Connecting..."}</Button>
                </div>
            </div>
        );
    }
}

PreviewFile.propTypes = {
    closeMenu: PropTypes.func,
    file: PropTypes.object,
    fileUrl: PropTypes.string,
    onClickCancel: PropTypes.func,
    onClickSend: PropTypes.func,
    is_socket_connected: PropTypes.bool
};

PreviewFile.defaultProps = {
    is_socket_connected: false,
}

export default DelayComponent(PreviewFile);
