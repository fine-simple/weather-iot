#include <WiFi.h>
#include <Adafruit_BMP085.h>
#include "ESP32_MailClient.h"
#include <ArduinoWebsockets.h>
#include "DHT.h"
// Pins
#define DHTTYPE DHT11
#define DHTPIN 4
// Email
#define emailSenderAccount "cocomanga59@gmail.com"
#define emailSenderPassword "otdzyyapakdabofe"
#define smtpServer "smtp.gmail.com"
#define smtpServerPort 465
#define emailSubject "[ALERT] ESP32 temp"
// Wifi
#define SSID "test"
#define PASS "1234567890"
// WebSocket
#define WS_URI "ws://brovm.francecentral.cloudapp.azure.com/ws"

// HTTP Client
websockets::WebsocketsClient client;
// Default Recipient Email Address
String reciever_email = "cocomanga@gmail.com";
String threshold = "25.0";

// Default Threshold temp Value
bool email_sent = false;
SMTPData smtd;
Adafruit_BMP085 bmp_180;
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASS);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("WiFi Failed!");
  }
  if (!bmp_180.begin(0x77)) {
    Serial.println("Not connected with BMP180 sensor, check connections ");
    while (1) {}
  }

  dht.begin();
  Serial.println(WiFi.localIP());
  client.connect(WS_URI);
}

void loop() {
  float temp = bmp_180.readTemperature();

  //Serial.print("Temp = ");
  Serial.print("temp:");
  Serial.print(temp);
  Serial.print(",");
  //Serial.println(" *C");

  float pres = bmp_180.readPressure();
  //Serial.print("Pressure = ");
  Serial.print("pressure:");
  Serial.print(pres);
  Serial.print(",");

  //Serial.println(" Pa");
  float alt = bmp_180.readAltitude() * -1;

  //Serial.print("Altitude = ");
  Serial.print("altitude:");
  Serial.print(alt);
  Serial.print(",");

  //Serial.println(" meters");

  float hum = dht.readHumidity();
  //Serial.print("Humidity = ");
  Serial.print("humidity:");
  Serial.println(hum);
  //Serial.println(" par");

  if (temp > threshold.toFloat() && !email_sent) {
    String emailMessage = String("temp above threshold. Current temp: ") + String(temp) + String("C");
    if (sendEmailNotification(emailMessage)) {
      Serial.println(emailMessage);
      email_sent = true;
    } else {
      Serial.println("Email failed to send");
    }
  }

  // Check if temp is below threshold and if it needs to send the Email alert
  else if ((temp < threshold.toFloat()) && email_sent) {
    String emailMessage = String("temp below threshold. Current temp: ") + String(temp) + String(" C");
    if (sendEmailNotification(emailMessage)) {
      Serial.println(emailMessage);
      email_sent = false;
    } else {
      Serial.println("Email failed to send");
    }
  }

  if ((WiFi.status() == WL_CONNECTED)) {

    String jsonData = ("{\"api_key\":\"tPmAT5Ab3j7F9\", \"temp\": " + std::to_string(temp) + ", \"pressure\": " + std::to_string(pres) + ", \"altitude\": " + std::to_string(alt) + ", \"humidity\": " + std::to_string(hum) + " }").c_str();
    client.send(jsonData);
  } else {
    Serial.println("WiFi Disconnected");
    delay(1000);
  }

  Serial.println();
  delay(500);
}

bool sendEmailNotification(String emailMessage) {
  // Set the SMTP Server Email host, port, account and password
  smtd.setLogin(smtpServer, smtpServerPort, emailSenderAccount, emailSenderPassword);

  // For library version 1.2.0 and later which STARTTLS protocol was supported,the STARTTLS will be
  // enabled automatically when port 587 was used, or enable it manually using setSTARTTLS function.
  //smtpData.setSTARTTLS(true);

  // Set the sender name and Email
  smtd.setSender("ESP32", emailSenderAccount);

  // Set Email priority or importance High, Normal, Low or 1 to 5 (1 is highest)
  smtd.setPriority("High");

  // Set the subject
  smtd.setSubject(emailSubject);

  // Set the message with HTML format
  smtd.setMessage(emailMessage, true);

  // Add recipients
  smtd.addRecipient(reciever_email);

  // Start sending Email, can be set callback function to track the status
  if (!MailClient.sendMail(smtd)) {
    Serial.println("Error sending Email, " + MailClient.smtpErrorReason());
    return false;
  }
  // Clear all data from Email object to free memory
  smtd.empty();
  return true;
}
