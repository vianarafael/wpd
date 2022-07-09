import { useEffect } from 'react';

/*global amp*/

interface AzureVideoProps {
  src: {
    src: string;
    type: string;
  }[];
  options?: amp.Player.Options;
}

function AzureVideo({ src, options }: AzureVideoProps) {
  useEffect(() => {
    // console.log('options', options);
    const mergedOptions = {
      autoplay: true,
      controls: false,
      fluid: true,
      ...options,
    };
    const myPlayer = amp('vid1', mergedOptions, function (this: amp.Player) {
      // console.log('Good to go!', this);
      // this.play();
      // add an event listener
      // this.addEventListener("ended", function () {
      //   console.log("Finished!");
      // });
    });
    myPlayer.src(src);
  }, [src, options]);

  return (
    <video id="vid1" className="azuremediaplayer amp-default-skin"></video>
  );
}

export default AzureVideo;
