import React from 'react';
import Lottie from 'react-lottie';
import { chatbot_client_info } from '../../../data/config/urls';

export default class LottieContainer extends React.PureComponent {
    lottieDefaultOptions = {
        loop: true,
        autoplay: true,
        path: chatbot_client_info.trigger.lottie_path,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    
    render() {
        return (
            <Lottie options={this.lottieDefaultOptions} height={chatbot_client_info.trigger.lottie_icon_height} width={chatbot_client_info.trigger.lottie_icon_width} />
        )
    }
}
