import { useRouter } from 'next/router';
import React from 'react';
import PaymentHistory from '../../../components/componentsDashboard/PaymentHistory';




const Slug = () => {
  const router = useRouter();


  return (
    <div>
      <PaymentHistory/>
    
  
    </div>
  );
};

export default Slug;