import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';

import './index.scss';

import { chatbot_setting } from '../../../../data/config/brandSetup'

const DIRECTION = {
  LEFT: "left",
  RIGHT: "right"
};

export default class QuickReply extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleTranslate = this.handleTranslate.bind(this);
    this.quick_reply_view = React.createRef()
    this.quick_replay_track = React.createRef()
    this.state = {
      translate: 0,
      disableLeft: false,
      disableRight: true,
    };
  }

  handleTranslate = dir => {
    let { translate } = this.state;
    const view_width = this.quick_reply_view.current.offsetWidth;
    const track_width = this.quick_replay_track.current.scrollWidth;
    if (view_width > track_width) {
      this.setState({
        disableLeft: true,
        disableRight: true,
      });
    } else {
      if (dir === DIRECTION.LEFT) {
        let offset = view_width - track_width;
        if (translate > offset && translate <= 0) {
          this.setState({
            translate: translate - 40,
            disableRight: false,
          });
        } else {
          this.setState({
            disableLeft: true
          });
        }
      }
      if (dir === DIRECTION.RIGHT) {
        let offset = track_width - view_width;
        if (translate < offset && translate < 0) {
          this.setState({
            translate: translate + 40,
            disableLeft: false,
          });
        } else {
          this.setState({
            disableRight: true
          });
        }
      }
    }
  };

  translateRight = () => {
    this.handleTranslate(DIRECTION.RIGHT);
  };

  translateLeft = () => {
    this.handleTranslate(DIRECTION.LEFT);
  };

  render() {
    const { translate, disableLeft, disableRight } = this.state;
    const { quick_replies, sendTextToServer } = this.props;
    const translate_px = `${translate}px`;

    return (
      <div className={`ori-relative ori-full-width oriQuickReplyContainer ${chatbot_setting.chat_interface.quick_reply_bg_transparent ? "" : "ori-bg-footer"}`}>
        {
          !disableRight &&
          <Button
            icon="left"
            className="ori-absolute ori-lr-pad-5 ori-btn-quick-reply-icon alignLeft"
            onClick={this.translateRight}
          />
        }
        {
          !disableLeft &&
          <Button
            icon="right"
            className="ori-absolute ori-lr-pad-5 ori-btn-quick-reply-icon alignRight"
            onClick={this.translateLeft}
          />
        }
        <div
          ref={this.quick_reply_view}
          className="ori-full-width quickReplyBodyContainer"
        >
          <div
            ref={this.quick_replay_track}
            className="ori-flex quickReplyTrack"
            style={{
              transform: "translate3d(" + translate_px + ",0,0)"
            }}
          >
            {
              quick_replies.map((reply, index) => {
                return (
                  <Button
                    key={index}
                    size="small"
                    className="ori-lr-pad-5 ori-lr-mrgn-5 ori-btn-quick-reply"
                    onClick={() => sendTextToServer(reply)}
                  >
                    {reply}
                  </Button>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

QuickReply.propTypes = {
  quick_replies: PropTypes.array,
  sendTextToServer: PropTypes.func,
};

QuickReply.defaultProps = {
  quick_replies: []
}
