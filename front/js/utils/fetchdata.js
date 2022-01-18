//* Fetch Data from the DB
const fetchData = async (config,url) => {
    try{
        const response = await fetch(config.host+url);
    
        if(!response.ok) throw (e)

        return response.json()
    }
    catch(e){
        console.log(e);
    }
}