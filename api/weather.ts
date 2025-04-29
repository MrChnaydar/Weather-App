// import { VercelRequest, VercelResponse } from '@vercel/node';

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   const { type, lat, lon, city, country, input, unit } = req.query;

//   const apiKey = process.env['OPENWEATHER_API_KEY'];
//   console.log(apiKey);

//   if (!apiKey) {
//     return res
//       .status(500)
//       .json({ error: 'API Key not set. or Error with stored API Key' });
//   }

//   let apiUrl = '';

//   if (type === 'current') {
//     apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=${unit}`;
//   } else if (type === 'reverse') {
//     apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
//   } else if (type === 'direct') {
//     apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`;
//   } else if (type === 'forecast') {
//     apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=${unit}`;
//   } else {
//     return res.status(400).json({ error: 'Invalid request type' });
//   }

//   try {
//     const response = await fetch(apiUrl);
//     console.log(apiUrl);
//     const data = await response.json();
//     console.log(data);
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ error: 'Error fetching weather data.' });
//   }
// }

/*
  This is a sanity check function to test if vercel can reach my /api/weather.ts file
*/

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ message: 'Function works!' });
}
