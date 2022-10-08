export const loadIssues = async (page, limit, setError) => {
  try {
   
    const response = await fetch(
      `https://api.github.com/repos/facebook/react/issues?per_page=${limit}&page=${page}`
    );
    if(!response.ok){
        throw Error('Could not fetch issues resource')
    }
    setError('');
    return await response.json();
  } catch (error) {
    setError('Please check your network connection and try again!');
    return [];
  }
};
