import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import LeftIcon from 'react-icons/lib/md/chevron-left';
import RightIcon from 'react-icons/lib/md/chevron-right';

import './index.scss';

const DIRECTION = {
  LEFT: "left",
  RIGHT: "right"
};

export default class QuickReply extends React.PureComponent {
  constructor() {
    super();
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
      <div className="ori-relative ori-full-width ori-full-parent-height oriQuickReplyContainer">
        {
          !disableRight &&
          <Button className="ori-absolute ori-pad-3 ori-flex-column ori-flex-jc iconBtn  alignLeftIcon" onClick={this.translateRight}>
            <LeftIcon size={20} />
          </Button>
        }
        {
          !disableLeft &&
          <Button className="ori-absolute ori-pad-3 ori-flex-column ori-flex-jc iconBtn alignRightIcon" onClick={this.translateLeft}>
            <RightIcon size={20} />
          </Button>
        }
        <div className="ori-full-width ori-full-parent-height quickReplyBodyContainer" ref={el => { this.quick_reply_view = el; }}>
          <div id="quick_reply_track" className="ori-full-parent-height ori-flex-row quickReplyTrack" style={{ transform: "translate3d(" + translate_px + ",0,0)" }} ref={el => { this.quick_replay_track = el; }}>
            {
              quick_replies.map((reply, index) => {
                return (
                  <div className="ori-animated ori-fade-in ori-full-parent-height ori-lr-pad-5 ori-flex-column ori-flex-jc" key={index}>
                    <Button className="ori-lr-pad-5 ori-btn-ghost-primary ori-font-sm " onClick={() =>  sendTextToServer(reply)}>{reply}</Button>
                  </div>
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
