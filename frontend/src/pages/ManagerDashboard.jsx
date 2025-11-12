import React, { useEffect, useState } from 'react'
import { listRequests, approveRequest, rejectRequest, updateStatus } from '../api'

export default function ManagerDashboard(){
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('PENDING')
  const [comment, setComment] = useState('')

  const load = async () => {
    const data = await listRequests({ status: filter })
    setItems(data)
  }

  useEffect(()=>{ load() }, [filter])

  return (
    <div style={{padding:12}}>
      <h2>Manager Dashboard</h2>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <label>Status Filter:</label>
        <select value={filter} onChange={e=>setFilter(e.target.value)}>
          {['PENDING','APPROVED','REJECTED','DISPATCHED','DELIVERED',''].map(s=>(<option key={s} value={s}>{s||'ALL'}</option>))}
        </select>
        <button onClick={load}>Refresh</button>
      </div>
      <div style={{marginTop:12}}>
        {items.map(it => (
          <div key={it._id} style={{border:'1px solid #ddd', padding:10, marginBottom:8}}>
            <div><b>{it.materialType}</b> — {it.quantity} {it.unit} @ {it.site}</div>
            <div>Requested By: {it.requestedBy} | Status: {it.status}</div>
            <div>Photos: {it.photos?.map((p,i)=>(<a key={i} href={`http://localhost:4000${p}`} target="_blank">photo{i+1} </a>))}</div>
            <div style={{display:'flex', gap:6, marginTop:6}}>
              <input placeholder="Manager comment" value={comment} onChange={e=>setComment(e.target.value)}/>
              <button onClick={async()=>{ await approveRequest(it._id, comment); load(); }}>Approve</button>
              <button onClick={async()=>{ await rejectRequest(it._id, comment); load(); }}>Reject</button>
              <select onChange={async(e)=>{ await updateStatus(it._id, e.target.value); load(); }} value={it.status}>
                {['PENDING','APPROVED','REJECTED','DISPATCHED','DELIVERED'].map(s=>(<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
