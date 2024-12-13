 export const parseJwt = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url).replace(/(.{76})/g, '$1')
    );
    return JSON.parse(base64);
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
};
