
const fetch = require('node-fetch')

async function testRegister() {
  try {
    const response = await fetch(
      'http://localhost:5000/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Kezia',
          email: 'kezia@gmail.com',
          password: 'Kezia12345',
        }),
      }
    )

    const result = await response.json()

    console.log('Status:', response.status)
    console.log('Hasil:', result)

  } catch (error) {
    console.error('Gagal:', error.message)
  }
}

testRegister()
