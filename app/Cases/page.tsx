"use client"

import { useState, useMemo, useEffect} from 'react';
import CaseView from './caseView';

import { useSession } from 'next-auth/react';
import { getCases} from '../utils';
import { Case } from '../types';
import { useRemindersContext } from '../store';

function Cases() {
  const {Reminders,SetReminders}=useRemindersContext()

  const [page, setPage] = useState(1);
  const session=useSession()

  const per_page = 9;
  const cases=useMemo<Case[]>(()=>
  
  {
  return  getCases(Reminders)
  },[Reminders])
  const total_cases = cases.length
  const total_pages = Math.ceil(total_cases / per_page);



  useEffect(() => {
    
    async function fetchReminders() {
      try {
  
        const response = await fetch("/api/reminders");
        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }
        const data = await response.json();
                SetReminders(data.reminders);
      } catch (error) {
        console.error(error);
      }
    }
    

    if (session && session!=undefined && session.status=="authenticated" && Reminders.length==0) {
      fetchReminders()
    }
  }, [session]);

  if (!session ) {
    return <div>Please log in to view your reminders.</div>;
  }


  const cases_page = useMemo(
    () => cases.slice((page - 1) * per_page, page * per_page),
    [page,Reminders]
  );


  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  function renderPageButtons() {
    const buttons = [];

    // always show first and last page buttons
    buttons.push(
      <button
        key={1}
        className={`px-4 py-2 rounded-lg ${
          page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </button>
    );

    if (total_pages > 2) {
      if (page > 3) {
        buttons.push(<span key="ellipsis1">...</span>);
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(total_pages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-4 py-2 rounded-lg ${
              page === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (page < total_pages - 2) {
        buttons.push(<span key="ellipsis2">...</span>);
      }
    }

    if (total_pages > 1) {
      buttons.push(
        <button
          key={total_pages}
          className={`px-4 py-2 rounded-lg ${
            page === total_pages
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handlePageChange(total_pages)}
        >
          {total_pages}
        </button>
      );
    }

    return buttons;
  }

  return (
    <div className="mt-4">
      <div className="bg-gray-300 rounded overflow-hidden shadow-lg w-1/2 mx-auto p-3 mb-4">
        <div className="mx-3">
          <div className="text-2xl text-center text-gray-700 font-semibold">
            Cases
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mx-3">
        {cases_page.map((Case) => (
          <CaseView
            key={Case.CaseId}
            CaseId={Case.CaseId}
            count={Case.Reminders.length}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {renderPageButtons()}
      </div>
    </div>
  );
}

export default Cases;