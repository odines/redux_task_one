export function checkLogin(username, password) {
	console.log('CheckLogin function: username = ' + username + ', password = ' + password)
	return (username === 'admin' && password === '12345')
}