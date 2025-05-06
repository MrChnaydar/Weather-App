import { inject } from '@angular/core';
import { SettingsService } from '../app/services/settings.service';

let setting: SettingsService = inject(SettingsService);
export function humidityStatus(feelsLike: number, humidity: number): string {
  let temp = feelsLike;
  if (setting.getSettings().units == 'imperial') {
    temp = (5 / 9) * (temp - 32);
  }
  if (temp <= 0) {
    if (humidity <= 30)
      return 'Feels even colder due to dry air, risk of frostbite ❄️';
    if (humidity <= 60) return 'Still freezing, but moisture helps slightly 🌫️';
    if (humidity <= 80) return 'Cold, but damp air makes it feel heavier 🌧️';
    return 'Icy and damp, risk of hypothermia ⚠️';
  } else if (temp <= 10) {
    if (humidity <= 30) return 'Dry cold, sharp air but tolerable 🌬️';
    if (humidity <= 60) return 'Cool and fresh, comfortable for most people 🍃';
    if (humidity <= 80) return 'Feels a little colder due to moisture ❄️';
    return 'Cold and damp, can feel bone-chilling 🌫️';
  } else if (temp <= 20) {
    if (humidity <= 30) return 'Crisp and fresh, ideal weather ☀️';
    if (humidity <= 60) return 'Comfortable warmth with slight humidity 🌤️';
    if (humidity <= 80) return 'Slightly humid but still pleasant 🌥️';
    return 'Sticky coolness, moisture makes it feel cooler 🌧️';
  } else if (temp <= 25) {
    if (humidity <= 30) return 'Dry and warm, comfortable for most people ☀️';
    if (humidity <= 60) return 'Warm with mild humidity, still pleasant 🌤️';
    if (humidity <= 80) return 'Humidity makes it feel a bit warmer 🌥️';
    return 'Sticky warmth, slight discomfort starts 🌆';
  } else if (temp <= 30) {
    if (humidity <= 30) return 'Dry heat, tolerable but warm 🌞';
    if (humidity <= 60) return 'Warm and slightly sweaty, but bearable 🌤️';
    if (humidity <= 80)
      return 'Feels hotter due to humidity, sweat struggles to evaporate 🌆';
    return 'Muggy and heavy air, discomfort rising 🥵';
  } else if (temp <= 35) {
    if (humidity <= 30) return 'Hot but breathable, stay hydrated 🔥';
    if (humidity <= 60) return 'Feels hotter, noticeable discomfort 🌇';
    if (humidity <= 80) return 'Heavy heat, sweating a lot 🌆';
    return 'Feels oppressive, risk of heat exhaustion 🫠';
  } else if (temp <= 40) {
    if (humidity <= 30) return 'Intense dry heat, like a desert 🏜️';
    if (humidity <= 60) return 'Very hot, uncomfortable for long exposure 🌞';
    if (humidity <= 80) return 'Dangerous humidity, feels suffocating 🥵';
    return 'Feels like a sauna, extreme caution needed ⚠️';
  } else {
    if (humidity <= 30) return 'Extremely dry heat, risk of dehydration 🚨';
    if (humidity <= 60) return 'Feels like a furnace, heatstroke risk 🚑';
    if (humidity <= 80) return 'Almost unbearable, heat stress likely 🫠';
    return 'Deadly combination, avoid outdoor exposure 🚨';
  }
}
