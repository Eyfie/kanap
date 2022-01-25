//* Fetch Data from the DB
const fetchData = async (config,url) => {
    try{
        const response = await fetch(config.host+url);
    
        if(!response.ok) throw response;

        return response.json()
    }
    catch(e){
        throw Error(e.status ? `${e.status} ${e.statusText}` : 'Le serveur ne répond pas');
    }
}

const postData = async () => {
    //*TODO
}