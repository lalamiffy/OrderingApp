
//const BASE_URL = 'http://10.0.2.2:3913';
//const BASE_URL = 'https://iron-girl.azurewebsites.net/'
const BASE_URL = 'http://localhost:3913'

export async function getMenuData() {
    const url = new URL('api/v2/menuitem', BASE_URL);
   
    //const token = await getToken();
    const response = await fetch(url, {
        method: 'GET',
        // headers: {
        //     "Authorization": `Bearer ${token}`
        //  }       
    });
    const data = await response.json();
    
    return data;
}