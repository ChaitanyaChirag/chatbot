import React from 'react';
import Lottie from 'react-lottie';

import { chatbot_setting } from '../../../data/config/brandSetup';
import lottiejson from '../../../data/assets/lottie.json'

const LottieContainer = React.memo(() => (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: lottiejson,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }}
    height={chatbot_setting.trigger.lottie.height}
    width={chatbot_setting.trigger.lottie.width}
  />
))

export default LottieContainer;
