export async function getCountriesData() {
  const request = await fetch(
    'https://restcountries.eu/rest/v2/all?fields=name;callingCodes',
  );
  const response = await request.json();
  return response;
}
