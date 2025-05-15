import { ResiData } from "@/store/ResiStore";

const endpoint = process.env.ENDPOINT_API;

export async function getAllResi(): Promise<ResiData[] | null> {
    const res = await fetch(`${endpoint}/resi`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const body = await res.json()
    console.log('body:', body)

    if (!res.ok) throw new Error('Getting resi failed: ', body.message)
    return body.data
}