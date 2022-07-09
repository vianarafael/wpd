import FTE_TO_SPC from 'assets/videos/FTE_TO_SPC.mp4';
import SPC_TO_GAE from 'assets/videos/SPC_TO_GAE.mp4';  
import GAE_TO_FTE from 'assets/videos/GAE_TO_FTE.mp4';
import FTE_TO_GAE from 'assets/videos/FTE_TO_GAE.mp4';
import SPC_TO_FTE from 'assets/videos/SPC_TO_FTE.mp4';  
import GAE_TO_SPC from 'assets/videos/GAE_TO_SPC.mp4';
import FTE_CHOSEN from  'assets/videos/FTE_CHOSEN.mp4';
import SPC_CHOSEN from  'assets/videos/SPC_CHOSEN.mp4';
import GAE_CHOSEN from  'assets/videos/GAE_CHOSEN.mp4';
import FTE_BACKGROUND from 'assets/videos/FTE_BACKGROUND.mp4';
import SPC_BACKGROUND from 'assets/videos/SPC_BACKGROUND.mp4';
import GAE_BACKGROUND from 'assets/videos/GAE_BACKGROUND.mp4';
import FTE_FOUNTAIN from 'assets/videos/FTE_Fountain.mp4';
import SPC_FOUNTAIN from 'assets/videos/SPC_Fountain.mp4';
import GAE_FOUNTAIN from 'assets/videos/GAE_Fountain.mp4';
 
export const products = {
  FTE: 'FTE',
  SPC: 'SPC',
  GAE: 'GAE'
};

type nextType = {
  [key: string]: {
    product: string,
    video: string,
  }
};

export const nextProductWhenSwipedLeft: nextType = {
  FTE: {
    product: products.SPC,
    video: FTE_TO_SPC,
  },
  SPC: {
    product: products.GAE,
    video: SPC_TO_GAE,
  },
  GAE: {
    product: products.FTE,
    video: GAE_TO_FTE,
  }
}

export const nextProductWhenSwipedRight: nextType = {
  FTE: {
    product: products.GAE,
    video: FTE_TO_GAE,
  },
  SPC: {
    product: products.FTE,
    video: SPC_TO_FTE,
  },
  GAE: {
    product: products.SPC,
    video: GAE_TO_SPC,
  }
}


type backgroundVideosType = {
  [key : string]: string
}

export const chosenProduct: backgroundVideosType = {
  FTE: FTE_CHOSEN,
  SPC: SPC_CHOSEN,
  GAE:  GAE_CHOSEN,
}

export const backgroundVideos: backgroundVideosType = {
  FTE: FTE_BACKGROUND,
  SPC: SPC_BACKGROUND,
  GAE: GAE_BACKGROUND,
}

export const backToFountain = {
  FTE: FTE_FOUNTAIN,
  SPC: SPC_FOUNTAIN,
  GAE: GAE_FOUNTAIN
}
