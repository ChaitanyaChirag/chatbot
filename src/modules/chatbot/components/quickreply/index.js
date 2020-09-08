import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';

import './index.scss';

const DIRECTION = {
  LEFT: "left",
  RIGHT: "right"
};

export default class QuickReply extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleTranslate = this.handleTranslate.bind(this);
    this.state = {
      translate: 0,
      disableLeft: false,
      disableRight: true,
    };
  }

  handleTranslate = dir => {
    let { translate } = this.state;
    const view_width = this.quick_reply_view.offsetWidth;
    const track_width = this.quick_replay_track.scrollWidth;
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
      <div className="ori-relative ori-full-width oriQuickReplyContainer">
        {
          !disableRight &&
          <Button
            icon="left"
            className="ori-absolute ori-lr-pad-5 ori-btn-fill-primary ori-align-top-4  alignLeft"
            onClick={this.translateRight}
          />
        }
        {
          !disableLeft &&
          <Button
            icon="right"
            className="ori-absolute ori-lr-pad-5 ori-btn-fill-primary ori-align-top-4 alignRight"
            onClick={this.translateLeft}
          />
        }
        <div
          className="ori-full-width quickReplyBodyContainer"
          ref={el => { this.quick_reply_view = el; }}
        >
          <div
            id="quick_reply_track"
            className="ori-flex quickReplyTrack"
            style={{
              transform: "translate3d(" + translate_px + ",0,0)"
            }}
            ref={el => { this.quick_replay_track = el; }}
          >
            {
              quick_replies.map((reply, index) => {
                return (
                  <Button
                    key={index}
                    size="small"
                    className="ori-lr-pad-5 ori-lr-mrgn-5 ori-btn-ghost-primary"
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
