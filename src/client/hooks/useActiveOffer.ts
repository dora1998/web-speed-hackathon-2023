import { useEffect, useState } from 'react';

import type { LimitedTimeOfferFragmentResponse } from '../graphql/fragments';
import { getActiveOffer } from '../utils/get_active_offer';

export function useActiveOffer(offers: LimitedTimeOfferFragmentResponse[] | undefined) {
  const [activeOffer, setActiveOffer] = useState<LimitedTimeOfferFragmentResponse | undefined>(undefined);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!offers) {
        setActiveOffer(undefined);
        return;
      }

      const offer = getActiveOffer(offers);
      setActiveOffer(offer);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [offers]);

  return { activeOffer };
}
