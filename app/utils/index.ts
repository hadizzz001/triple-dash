

export async function fetchTemp() { 
    const response = await fetch('/api/posts', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}


