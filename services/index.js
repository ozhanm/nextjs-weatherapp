const API_URL = "https://ozhanmengucek.com/api.php";

const siteAPI = async (action, query = '', data = '') => {
    try {
        let res = {};
        const METHOD = data ? 'POST' : 'GET';
        const headers = {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }

        switch (METHOD) {
            case 'POST':
                res = await fetch(
                    `${API_URL}?action=${action}${query}`,
                    {
                        cache: 'no-store',
                        method: METHOD,
                        body: data,
                        headers
                    }
                );

                break;

            default:
                // GET
                res = await fetch(
                    `${API_URL}?action=${action}${query}`,
                    {
                        cache: 'no-store',
                        method: METHOD,
                        headers
                    }
                );

                break;
        }
        return res.json();
    } catch (error) {
        throw new Error(error);
    }
}

const getProjects = async (query = '') => {
    return siteAPI('getProjects', query);
}
const getBlogs = async (query = '') => {
    return siteAPI('getBlogs', query);
}
const getProject = async (query = '') => {
    return siteAPI('getProject', query);
}
const getBlog = async (query = '') => {
    return siteAPI('getBlog', query);
}
const addComment = async (data = '') => {
    return siteAPI('addComment', '', data);
}
const contactForm = async (data = '') => {
    return siteAPI('contactForm', '', data);
}

export {
    getProjects,
    getBlogs,
    getProject,
    getBlog,
    addComment,
    contactForm
}