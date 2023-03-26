import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { UrlObject } from 'url';

function HomeCard(props: { icon: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; href: string | UrlObject; Button: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  return (
    <div className="max-w-sm rounded overflow-hidden  p-3 mx-3 ">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="self-center">
          <FontAwesomeIcon icon={props.icon === 'plus' ? faPlus : faBriefcase} className="fa-2xl text-blue-500" />
        </div>
      </div>
      <div className="text-xl text-center font-semibold text-gray-600">
        {props.title}
      </div>
      <div className="text-lg text-center ">
        {props.description}
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div>
          <Link href={props.href} className="bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-400 mt-2">
            {props.Button}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;