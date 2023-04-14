const server = process.env.SERVER || "http://localhost:3000/"

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