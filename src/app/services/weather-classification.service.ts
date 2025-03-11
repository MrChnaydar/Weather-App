import { Injectable } from '@angular/core';
import { ClassificationType } from '../model/classification-type.data';

@Injectable({
  providedIn: 'root',
})
export class WeatherClassificationService {
  constructor() {}

  private classifications: ClassificationType[] = [
    {
      temperatureRange: '≤ 0°C (Freezing)',
      humidityRanges: {
        dryAir: 'Feels even colder due to dry air, risk of frostbite ❄️',
        moderate: 'Still freezing, but moisture helps slightly 🌫️',
        humid: 'Cold, but damp air makes it feel heavier 🌧️',
        veryHumid: 'Icy and damp, risk of hypothermia ⚠️',
      },
    },
    {
      temperatureRange: '1 - 10°C (Cold)',
      humidityRanges: {
        dryAir: 'Dry cold, sharp air but tolerable 🌬️',
        moderate: 'Cool and fresh, comfortable for most people 🍃',
        humid: 'Feels a little colder due to moisture ❄️',
        veryHumid: 'Cold and damp, can feel bone-chilling 🌫️',
      },
    },
    {
      temperatureRange: '11 - 20°C (Mild)',
      humidityRanges: {
        dryAir: 'Crisp and fresh, ideal weather ☀️',
        moderate: 'Comfortable warmth with slight humidity 🌤️',
        humid: 'Slightly humid but still pleasant 🌥️',
        veryHumid: 'Sticky coolness, moisture makes it feel cooler 🌧️',
      },
    },
    {
      temperatureRange: '21 - 25°C (Warm)',
      humidityRanges: {
        dryAir: 'Dry and warm, comfortable for most people ☀️',
        moderate: 'Warm with mild humidity, still pleasant 🌤️',
        humid: 'Humidity makes it feel a bit warmer 🌥️',
        veryHumid: 'Sticky warmth, slight discomfort starts 🌆',
      },
    },
    {
      temperatureRange: '26 - 30°C (Hot)',
      humidityRanges: {
        dryAir: 'Dry heat, tolerable but warm 🌞',
        moderate: 'Warm and slightly sweaty, but bearable 🌤️',
        humid: 'Feels hotter due to humidity, sweat struggles to evaporate 🌆',
        veryHumid: 'Muggy and heavy air, discomfort rising 🥵',
      },
    },
    {
      temperatureRange: '31 - 35°C (Very Hot)',
      humidityRanges: {
        dryAir: 'Hot but breathable, stay hydrated 🔥',
        moderate: 'Feels hotter, noticeable discomfort 🌇',
        humid: 'Heavy heat, sweating a lot 🌆',
        veryHumid: 'Feels oppressive, risk of heat exhaustion 🫠',
      },
    },
    {
      temperatureRange: '36 - 40°C (Extreme Heat)',
      humidityRanges: {
        dryAir: 'Intense dry heat, like a desert 🏜️',
        moderate: 'Very hot, uncomfortable for long exposure 🌞',
        humid: 'Dangerous humidity, feels suffocating 🥵',
        veryHumid: 'Feels like a sauna, extreme caution needed ⚠️',
      },
    },
    {
      temperatureRange: '> 40°C (Scorching)',
      humidityRanges: {
        dryAir: 'Extremely dry heat, risk of dehydration 🚨',
        moderate: 'Feels like a furnace, heatstroke risk 🚑',
        humid: 'Almost unbearable, heat stress likely 🫠',
        veryHumid: 'Deadly combination, avoid outdoor exposure 🚨',
      },
    },
  ];

  getClassification(temperature: number, humidity: number): string {
    enum HumidityRange {
      DryAir = 'dryAir',
      Moderate = 'moderate',
      Humid = 'humid',
      VeryHumid = 'veryHumid',
    }

    let tempRange: string;
    let humidityRange: HumidityRange;

    // Determine the temperature range
    if (temperature <= 0) {
      tempRange = '≤ 0°C (Freezing)';
    } else if (temperature <= 10) {
      tempRange = '1 - 10°C (Cold)';
    } else if (temperature <= 20) {
      tempRange = '11 - 20°C (Mild)';
    } else if (temperature <= 25) {
      tempRange = '21 - 25°C (Warm)';
    } else if (temperature <= 30) {
      tempRange = '26 - 30°C (Hot)';
    } else if (temperature <= 35) {
      tempRange = '31 - 35°C (Very Hot)';
    } else if (temperature <= 40) {
      tempRange = '36 - 40°C (Extreme Heat)';
    } else {
      tempRange = '> 40°C (Scorching)';
    }

    // Determine the humidity range
    if (humidity <= 30) {
      humidityRange = HumidityRange.DryAir;
    } else if (humidity <= 60) {
      humidityRange = HumidityRange.Moderate;
    } else if (humidity <= 80) {
      humidityRange = HumidityRange.Humid;
    } else {
      humidityRange = HumidityRange.VeryHumid;
    }

    // Find the classification based on temp and humidity
    const lastClassification = this.classifications.find(
      (entry) => entry.temperatureRange === tempRange
    );

    if (lastClassification) {
      return lastClassification.humidityRanges[humidityRange];
    } else {
      return 'Classification not available.';
    }
  }
}
