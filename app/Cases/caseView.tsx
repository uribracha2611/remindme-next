"use client"
import Link from 'next/link';
import { useRemindersContext } from '../store';

interface PropInter{
  CaseId:number,
  count:number
}
const CaseView= (props:PropInter) => {
  const {Reminders,SetReminders}=useRemindersContext()
  const DeleteCase = async () => {
    let data=JSON.stringify({"CaseId":props.CaseId})
    const request =  await fetch("/api/Cases/delete",{body:data,method:"DELETE"})
    if(request.ok){
      SetReminders(Reminders.filter(rem => rem.caseid !== props.CaseId))
    }
  };

  
  
  return (
    <div className="max-w-sm shadow-md bg-gray-300">
      <div className="text-center text-xl text-gray-600 font-semibold mb-2">
        case {props.CaseId}
      </div>
      <div className="text-center text-lg font-semibold">
        reminder count: {props.count}
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-2 py-4 flex gap-3">
          <div>
            <Link href={`Cases/${props.CaseId}`}
              className="bg-blue-500 text-white rounded px-2 py-2 hover:bg-blue-400"
            >
              view case
            </Link>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white rounded px-2 py-2 hover:bg-blue-400"
              onClick={DeleteCase}
            >
              delete case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CaseView