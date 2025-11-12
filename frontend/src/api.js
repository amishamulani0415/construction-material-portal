// Simple API helper
const BASE = import.meta.env.VITE_API || 'http://localhost:4000';

export async function createRequest(data){
  const res = await fetch(`${BASE}/api/requests`, {
    method: 'POST',
    body: data
  });
  return res.json();
}

export async function listRequests(params={}){
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/requests?${q}`);
  return res.json();
}

export async function approveRequest(id, comment=''){
  const res = await fetch(`${BASE}/api/requests/${id}/approve`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ comment })
  });
  return res.json();
}

export async function rejectRequest(id, comment=''){
  const res = await fetch(`${BASE}/api/requests/${id}/reject`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ comment })
  });
  return res.json();
}

export async function updateStatus(id, status){
  const res = await fetch(`${BASE}/api/requests/${id}/status`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ status })
  });
  return res.json();
}

export async function consumption(params={}){
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/requests/consumption?${q}`);
  return res.json();
}

export async function pendingSummary(){
  const res = await fetch(`${BASE}/api/requests/summary/pending`);
  return res.json();
}
