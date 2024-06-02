import Link from 'next/link';
import React from 'react';

const ClientCard = ({client}) => {
    const {id, firstName, lastName, email, profilePicture} = client;
    return (
        <div className="card  bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p className="font-bold text-2xl">{email}</p>
    <div className="card-actions w-full  mt-5">
      <Link className="w-full" href={`/clientDetails/${id}`}>
      <button className="btn bg-blue-300 btn-primary w-full  text-white">Details</button>
      </Link>
      
    </div>
  </div>
</div>
    );
};

export default ClientCard;