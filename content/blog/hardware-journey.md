---
title: "Hardware Journey: Building the pikoAQI Prototype"
description: "A beginner's adventure in creating a wearable air quality sensor from scratch."
publishedAt: "2025-01-25"
---

## Intro

I wanted to make a hardware project, with no technical skills in hardware or electronics. So I started this project to learn along the way, knowing AI would be able to help me.

The project is a wearable/portable air quality sensor. I chose it because I needed one, and it sits at the right level of difficulty: no need to do R&D on sensors since they already exist, but not too easy either, because several features have to work together in a compact form with low power consumption.

## Ordering the prototype parts

To get started I explained my project to Claude (the AI) and it helped me brainstorm and choose the electronic components.

Here's my first order from the electronics shop:

| Component | Description | Price |
|-----------|-------------|-------|
| [NodeMCU ESP32](https://www.gotronic.fr/art-module-nodemcu-esp32-usb-c-47499.htm) | Main microcontroller board | 11,92 € H.T |
| [Screen E-Ink 2,13'' TF060](https://www.gotronic.fr/art-afficheur-e-ink-2-13-tf060-36080.htm) | Low-power e-ink display | 16,58 € H.T |
| [GPS module TEL0094](https://www.gotronic.fr/art-module-gps-tel0094-25732.htm) | Location tracking module | 15,50 € H.T |
| [Logic level converter](https://www.gotronic.fr/art-convertisseur-de-4-niveaux-logiques-21529.htm) | Logic level converter | 3,29 € H.T |
| [Air sensor SDS011](https://www.gotronic.fr/art-capteur-de-qualite-de-l-air-sds011-27929.htm) | Air quality sensor (PM2.5/PM10) | 29,12 € H.T |
| [Sensor BME280 SKU27347](https://www.gotronic.fr/art-module-bme280-sku27347-37634.htm) | Temperature/pressure/humidity sensor | 10,42 € H.T |
| [Sensor BME680 PIM357](https://www.gotronic.fr/art-capteur-environnemental-bme680-pim357-31583.htm) | Environmental sensor with VOC detection | 22,00 € H.T |

### Why these components

- **ESP32**: an entry-level yet capable microcontroller with built-in WiFi/Bluetooth, compact size, and enough processing power for production use.
- **E-ink display**: extremely low power consumption. It only needs power during screen updates and keeps the image when powered off.
- **GPS module**: basic GPS functionality for location tracking.
- **Air quality sensor (SDS011)**: detects particulate matter (PM2.5, PM10) in the air.
- **BME280/BME680 sensors**: measure temperature, pressure, humidity, and volatile organic compounds (VOCs).

## Working with the e-ink screen

The first part I tested was the e-ink screen. The one I ordered has no technical documentation, only an Arduino example. I gave it to Cursor as context and it was able to make it work in my code.

The screen communicates over SPI. The ESP32 board is supposed to have a built-in SPI implementation, but I couldn't make it work with the screen, so I kept the custom SPI implementation from the documentation example.

The problem with e-ink is the refresh rate: it's very slow, and a full change of the screen can take up to 2 seconds.

The screen has two modes, "partial update" and "full refresh". Partial update is faster since it doesn't have to flush the entire screen. I used it to build a "fast" refresh mode:

1. Partial update a full white screen to flush the current image
2. Partial update to paint the new image

Some ghosting can appear, so the fast mode is only for cases where ghosting is not a problem.

Benchmarks:

- Full refresh: 2 seconds
- "Fast" refresh: 1.1 seconds

### Learnings

- There are different modes to display an image (partial update / full update)
- E-ink screens are slow to render content
- This screen might fit my needs, but I can probably find a cheaper and faster one
- I still need to understand why native SPI doesn't work with it

## Working with the GPS

The GPS was much easier. Claude knew how to wire it, and the documentation pointed to the [TinyGPS++](https://github.com/mikalhart/TinyGPSPlus/tree/master) library.

The physical LEDs on the GPS chip (POWER and PPS) also made debugging easier. On my first try the GPS wasn't powered correctly (a wire issue).

I was confused at first about why I got no location data, then learned that the GPS needs to sync first, and the first startup can take a long time (more than 5 minutes). For me it took longer, most likely because my room has a weak signal.

The PPS LED blinks exactly once per second once the GPS has a fix. A very easy way to understand that the missing location data wasn't a code issue: the GPS just needed to sync.

The GPS I ordered supports 10Hz (normal GPS modules run at 1Hz) and is made for drones. I don't need that much performance. What I need is strong accuracy, even inside buildings, and a lower price. I'll order a better fit for the next prototype.

### Learnings

- GPS can take time to sync: several minutes on a cold start, 30s+ on a warm start
- I don't need a 1 to 10Hz GPS, I'm not building a plane or a fast moving device
- I need a GPS that works better indoors
- I need to look for a cheaper and more powerful alternative

## Working with the BME680 (air sensor)

I had a hard time communicating with this sensor. Cursor couldn't write a working implementation, even with examples. Luckily Adafruit made a library for this specific sensor, so I used it. They have libraries for a lot of different sensors, pretty useful.

The **VOC sensor** needs calibration and fluctuates early on, so values are only reliable after the first 48 hours of use. That will be hard to integrate into a device, since customers can't easily calibrate it. I'll need to pair it with other sensors to validate the data.

### Learnings

- The VOC sensor needs calibration. I'm not sure yet how to handle that for end users; maybe I'll only use it to monitor variations.

## Battery

I looked at LiPo and Li-Ion batteries. The LiPo form factor is much better, and it's what wearables use when size and weight matter, like laptops and phones.

But most LiPo batteries are 3.7V, and the ESP32 board I'm using expects 5V. I could boost the voltage, but that adds complexity and power inefficiency.

Batteries can also be dangerous: they are very sensitive to physical damage, and a LiPo cell can catch fire if it's pierced, overheated, over-discharged, and so on.

So for now I'm using a regular power bank with a USB-C cable.

### Learnings

- Most small LiPo batteries output 3.7V
- Safety norms and rules matter when working with batteries

## Software implementation

I've been working on the software side and on data synchronisation.

The goal is to have the ESP32 act as a Bluetooth Low Energy (BLE) server, with a client on my computer to retrieve the data.

At first I couldn't even upload my code to the microcontroller because it was too big. After some searching I found that the default BLE library is not lightweight at all and was using 75% of the available flash memory. I switched to [NimBLE](https://github.com/h2zero/NimBLE-Arduino), which is about 50% lighter, at the cost of only supporting BLE and not classic Bluetooth. Good thing, since I'm not planning to use classic Bluetooth.

*Stay tuned for more updates as I keep working on the pikoAQI wearable sensor!*
