import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';

import { translator } from '../../../../data/config/brandSetup';

import { LangContext } from '../../../context'

import DelayComponent from '../../../../components/delaycomponent';

class PreviewFile extends React.PureComponent {
  componentWillUnmount() {
    this.props.onFileRemove();
  };

  renderImage = lang => {
    const { file, fileUrl } = this.props;
    if (file && file.type && file.type.indexOf('image/') !== -1) {
      return (
        <div className="ori-bg-size-cover ori-bg-no-repeat" style={{ backgroundImage: `url(${fileUrl})`, height: '200px' }} />
      );
    }
    return (
      <div className="ori-pad-10 ori-flex-row ori-flex-center ori-font-light" style={{ fontSize: '3rem', height: '150px' }}>{translator.text[lang].fileSelected}</div>
    )
  };

  render() {
    const { isMounted, file, fileUrl, is_internet_connected, onClickCancel, onClickSend } = this.props;
    return (
      <LangContext.Consumer>
        {
          lang => (
            <div className={`ori-absolute ori-animated ori-animation-half ori-bg-black-light ori-align-full ori-z-index-99995 ori-pad-20 ori-flex-column ori-flex-center ${isMounted ? "ori-fade-in": "ori-fade-out"}`}>
              <div className="ori-border-radius-light ori-border-radius-5 ori-bg-white ori-b-mrgn-10 ori-overflow-hidden ori-bg-position-center ori-full-width">
                {this.renderImage(lang)}
                {
                  file &&
                  <div className="ori-pad-5 ori-overflow-hidden">
                    <a className="ori-text-overflow-dotted ori-font-default-hover-primary" href={fileUrl} target="_blank" rel="noopener noreferrer">{file.name}</a>
                  </div>
                }
              </div>
              <div className="ori-flex-row ori-flex-jc ori-t-pad-15">
                <Button className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-ghost-primary" size="small" onClick={onClickCancel}>{translator.text[lang].cancel}</Button>
                <Button className={`ori-lr-mrgn-10 ori-lr-pad-20 ${ is_internet_connected ? "ori-btn-fill-primary" :""}`} size="small" disabled={!is_internet_connected} onClick={onClickSend}>{is_internet_connected ? translator.text[lang].send : translator.text[lang].connecting}</Button>
              </div>
            </div>
          )
        }
      </LangContext.Consumer>
    );
  }
}

PreviewFile.propTypes = {
  closeMenu: PropTypes.func,
  file: PropTypes.object,
  fileUrl: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickSend: PropTypes.func,
  is_internet_connected: PropTypes.bool
};

PreviewFile.defaultProps = {
  is_internet_connected: false,
}

export default DelayComponent(PreviewFile);
