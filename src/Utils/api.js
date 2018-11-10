export async function getBreachData(){
  try {
    const data = await fetch('https://haveibeenpwned.com/api/v2/breaches')
    const response = await data.json()
    return response
  } catch (error) {
    console.warn(error)
    return null
  }
}