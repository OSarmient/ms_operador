const server = process.env.SERVER || "http://168.176.84.62:3000/"  //"http://168.176.84.62:3000/"

module.exports = async (graphqlQuery) => {
    const response = await fetch(server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: graphqlQuery
        })
    })

    const jsonRespose = await response.json();
    return jsonRespose;
};