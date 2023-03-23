import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBriefcase } from '@fortawesome/free-solid-svg-icons';

function HomeCard(props:any) {
  return (
    <div className="max-w-sm rounded overflow-hidden  p-3 mx-3 ">
      <div className="flex flex-col justify-center items-center">
        <div className="self-center">
          <FontAwesomeIcon icon={props.icon === 'plus' ? faPlus : faBriefcase} className="fa-2xl text-blue-500" />
        </div>
      </div>
      <div className="text-xl text-center font-semibold text-gray-600">
        {props.title}
      </div>
      <div className="text-lg text-center">
        {props.description}
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <button className="bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-400 mt-2">
            {props.Button}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;