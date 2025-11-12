import React, { useState } from 'react'
import { createRequest } from '../api'

export default function NewRequest(){
  const [form, setForm] = useState({ site:'', materialType:'CEMENT', quantity:0, unit:'Bags', requestedBy:'' })
  const [photos, setPhotos] = useState([])
  const [created, setCreated] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    for (const k of Object.keys(form)) data.append(k, form[k])
    for (const f of photos) data.append('photos', f)
    const res = await createRequest(data)
    setCreated(res)
  }

  return (
    <div style={{padding:12}}>
      <h2>New Material Request</h2>
      <form onSubmit={onSubmit} style={{display:'grid', gap:10, maxWidth:480}}>
        <input placeholder="Site" value={form.site} onChange={e=>setForm({...form, site:e.target.value})} required/>
        <select value={form.materialType} onChange={e=>setForm({...form, materialType:e.target.value})}>
          {['CEMENT','SAND','AGGREGATE','STEEL','BRICKS','OTHER'].map(m=><option key={m} value={m}>{m}</option>)}
        </select>
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} required/>
        <input placeholder="Unit (Bags/Tonnes/CFT)" value={form.unit} onChange={e=>setForm({...form, unit:e.target.value})}/>
        <input placeholder="Requested By" value={form.requestedBy} onChange={e=>setForm({...form, requestedBy:e.target.value})} required/>
        <input type="file" multiple onChange={e=>setPhotos([...e.target.files])}/>
        <button>Submit</button>
      </form>

      {created && (
        <div style={{marginTop:16, padding:12, border:'1px solid #ccc'}}>
          <div><b>Created:</b> {created._id}</div>
          <div>Status: {created.status}</div>
          <div>Photos: {created.photos?.map((p,i)=>(<a key={i} href={`http://localhost:4000${p}`} target="_blank">photo{i+1} </a>))}</div>
        </div>
      )}
    </div>
  )
}
