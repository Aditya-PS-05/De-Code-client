'use client';

import { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function page() {
    // const baseURL = 'http://localhost:3000/'
    const searchParams = useSearchParams()
    const router = useRouter()
    const code = searchParams.get('code')
    console.log(code);

    // const baseURI = `https://auth.delta.nitt.edu/api/oauth/token?client_id=xeD~vJrDuRV_vJvV&client_secret=R6oghYrWAAuL2RA1atE2~2FFalec5f2X&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback/`

    const baseURI = `http://localhost:3000/api/auth/${code}`

    console.log(baseURI)
    
    useEffect(() => {
        fetch(baseURI)
        .then(async(res) => {
                console.log("currently in callback")
                console.log(res);
                const resJSON = await res.json()
                console.log(await resJSON)
                if (resJSON.auth) {
                    localStorage.setItem("id", resJSON.id)
                    router.push("/problemspage")
                } else {
                    // router.push("/problemspage")
                }
            })
    }, [])

    return <div>
        <Loading />
    </div>
}