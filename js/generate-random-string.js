module.exports = {
  generateRandomString: generateRandomString = () => {
    const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return Array(6).join().split(',').map( () => {
      return s.charAt(Math.floor(Math.random() * s.length));
    }).join('');
  }
}
