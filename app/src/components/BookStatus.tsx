import { useState } from 'react';
import { getBookStatuses } from '../lib/api';

interface BookStatusProps {
  selectedId?: number
}

export default function BookStatus({selectedId}: BookStatusProps) {
  const statuses = getBookStatuses();
  const [statusId, setStatusId] = useState(selectedId)

  return (
    <div className='flex flex-col mb-2'>
      <label className='self-start font-semibold mb-1'>Status</label>
      <select name='status' value={statusId} required 
        onChange={e => setStatusId(Number(e.target.value))}
        className='self-start mb-2 bg-white'>
        <option>----- select -----</option>
        {statuses.map((status, index) => (
          <option key={index} value={index}>
            {status}
          </option>
        ))}
      </select>
    </div> 
  )
}