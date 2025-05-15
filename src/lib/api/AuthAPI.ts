const endpoint = process.env.ENDPOINT_API;

export async function login(data: { email: string, password: string }) {
    const res = await fetch(`${endpoint}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Login Failed')
    return res.json()
}

export async function register(data: { email: string, password: string }) {
    const res = await fetch(`${endpoint}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Register failed");
    return res.json();
}

export async function getCurrentUser() {
    const res = await fetch(`${endpoint}/auth/me`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) return null;
    return res.json();
}

export async function logout() {
    await fetch(`${endpoint}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
};