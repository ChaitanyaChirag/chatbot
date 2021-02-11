import React from 'react';
import Lottie from 'react-lottie';

import { chatbot_client_info } from '../../../data/config/brandSetup';
import { lottiejson } from '../../../data/assets'

const LottieContainer = React.memo(() => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: lottiejson,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }}
      height={chatbot_client_info.trigger.lottie_icon_height}
      width={chatbot_client_info.trigger.lottie_icon_width}
    />
  )
})


export default LottieContainer;
