export interface TwoWeeksType {
  daily: dayly[];
  // lat: number;
  // lon: number;
  // timezone: string;
  // timezone_offset: number;
}
interface dayly {
  dt: number;
  // sunrise: number;
  // sunset: number;
  // moonrise: number;
  // moonset: number;
  // moon_phase: number;
  // summary: string;
  temp: Temperature;
  // feels_like: Temperature;
  // pressure: number;
  // humidity: number;
  // dew_point: number;
  // wind_speed: number;
  // wind_deg: number;
  // wind_gust: number;
  weather: Weather[];
  //   clouds: number;
  //   pop: number;
  //   rain: number;
  //   uvi: number;
}

interface Temperature {
  // day: number;
  min: number;
  max: number;
  // night: number;
  // eve: number;
  // morn: number;
}

interface Weather {
  // id: number;
  // main: string;
  // description: string;
  icon: string;
}
