'use client';

import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

function Page() {
  const searchParams = useSearchParams()
  const agent = searchParams.get('agent')
  const phone = searchParams.get('phone')
  const id = searchParams.get('id')

  return (
    <>
      {id && phone && agent &&
        <Script
          src={`${process.env.NEXT_PUBLIC_BOT_LIVE_URL}/widget.iife.js`}
          data-id={id}
          data-phone_number={phone}
          data-assistant_name={agent}
        />
      }
    </>
  )
}

export default Page
