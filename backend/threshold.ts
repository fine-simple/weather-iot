import { sendMail } from "./email";

let lastHandledThresholdTime = -1;

export async function handleThreshold(
  thresholds,
  emailReceivers,
  weatherData: Weather
) {
  console.log("Handling Threshold", thresholds);

  if (!Object.keys(weatherData).find(k => weatherData[k] > thresholds[k]))
    return;
  if (weatherData.timestamp < lastHandledThresholdTime + 15 * 1000) return;

  lastHandledThresholdTime = weatherData.timestamp;
  sendMail(emailReceivers, weatherData);
}
