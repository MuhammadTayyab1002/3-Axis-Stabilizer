#  3-Axis Brushless Stabilizer

![Version](https://img.shields.io/badge/version-1.0-blue)
![STM32](https://img.shields.io/badge/STM32-L432-purple)
![License](https://img.shields.io/badge/license-MIT-green)

It is a professional-grade 3-axis brushless gimbal controller PCB built around the ultra-low-power **STM32L432** MCU. It features integrated three-phase motor drivers, onboard **MPU6050** IMU, and optimized power management — making it ideal for camera stabilizers, robotic platforms, handheld gimbals, and DIY stabilization projects.

---

## 🎯 Overview

This design combines high-performance motion control with exceptional power efficiency. The STM32L432's Cortex-M4 core with FPU handles sensor fusion and PID loops at up to 2kHz, while the integrated motor drivers provide smooth, quiet operation for brushless gimbal motors.

Key differentiators:
- **Ultra-low standby current** – perfect for battery-powered gimbals
- **Compact 4-layer PCB** – 65mm x 55mm footprint
- **Direct USB-C connectivity** – firmware updates and tuning via virtual COM port
- **Open-source friendly** – MIT licensed hardware and firmware

---

## ✨ Key Features

| Category | Specification |
|----------|---------------|
| **MCU** | STM32L432KCU6 – 80MHz Cortex-M4, 256KB Flash, 64KB RAM |
| **IMU** | MPU6050 – 6-axis (gyro + accelerometer) with DMP |
| **Motor Drivers** | 3x independent half-bridge stages (compatible with DRV8313, MP6540, or discrete FETs) |
| **Motor Outputs** | 3x BLDC motors (Pitch, Roll, Yaw) |
| **Input Voltage** | 7.4V – 16.8V (2S to 4S LiPo) |
| **Logic Supply** | 3.3V @ 500mA, 5V @ 1A for external peripherals |
| **Motor Current** | 2A continuous per axis (with proper cooling) |
| **Interfaces** | USB-C (DFU/CDC), SWD, UART, I²C, SPI, 4x ADC inputs, PWM input (RC receiver) |
| **Control Modes** | Rate mode, Angle mode, Velocity tracking, RC passthrough |
| **Sensor Fusion** | Complementary filter (default) / Madgwick AHRS (optional) |
| **Update Rate** | 500Hz – 2.5kHz adjustable |

---

## 📦 Hardware Specifications

### PCB Details
- **Dimensions:** 65mm x 55mm
- **Layers:** 4-layer (1oz copper, ENIG finish)
- **Mounting holes:** 4x M2.5 (63mm x 53mm pattern)
- **Connectors:**
  - 1x JST-XH 2-pin (power input)
  - 3x JST-SH 1.0mm 3-pin (motor outputs)
  - 1x USB-C (firmware/serial)
  - 1x 4-pin SWD header
  - 1x 4-pin UART expansion header
  - 1x 6-pin I²C/ADC expansion header

### Component Highlights
- **MPU6050** – I²C address 0x68, interrupt output to MCU
- **On-board LDOs:** 
  - 5V @ 1A (buck converter)
  - 3.3V @ 500mA (LDO for logic)
- **Status LEDs:** Power (blue), IMU ready (green), Motor fault (red)
- **Protection:** Reverse polarity, TVS diode (24V clamp), overcurrent sensing
