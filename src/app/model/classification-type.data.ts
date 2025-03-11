export interface ClassificationType {
  temperatureRange: string;
  humidityRanges: {
    dryAir: string;
    moderate: string;
    humid: string;
    veryHumid: string;
  };
}
