import React, { useState } from 'react';
import titleImage from '~/assets/images/kz_creation.svg?url';
import backgroundImage from '../../assets/images/u3629887153_a_stylish_fantasy_world_at_midnight_geometric_abs_49e0ca04-3bd7-4372-a11f-d2bb178a87cb_0.png?url';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Loading from '../layouts/Loading';

export default function IndexContent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#252525]">
      {isLoading ? (
        <Loading onComplete={() => setIsLoading(false)} />
      ) : (
         <>
          <Header />
          <div className="w-full h-screen flex items-center p-12 text-[#fcfcfc] font-futura text-3xl">
            <h1>I'm a seeker who thrives in chaotic times!</h1>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}
