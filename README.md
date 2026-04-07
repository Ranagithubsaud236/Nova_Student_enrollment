
# 🎓 Nova Student Enrollment Portal

A modern, containerized student enrollment web application built with **Flask** (Python) and **MongoDB Atlas**, featuring a sleek frontend and full Docker/Kubernetes support.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributors](#contributors)

---

## 🔍 Overview

This application allows administrators to enroll students by providing:

- Full name
- Student ID
- Course selection
- Email address

All data is stored in **MongoDB Atlas** (cloud). The frontend is a responsive, glass‑morphic UI with real‑time search and delete capabilities.

---

## 🧰 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Backend     | Flask (Python 3.11)                 |
| Database    | MongoDB Atlas                       |
| Frontend    | HTML5, CSS3, JavaScript (Vanilla)   |
| Container   | Docker                              |
| Orchestration | Kubernetes (AKS / any K8s)        |
| Version Control | Git + GitHub                    |

---

## ✨ Features

- ✅ Add new students with validation
- ✅ Real‑time search (name, ID, course, email)
- ✅ Delete students with confirmation
- ✅ Live student count badge
- ✅ Toast notifications
- ✅ Fully responsive design
- ✅ Dockerized for consistent deployments
- ✅ Kubernetes ready (Deployment + LoadBalancer)

---

## 🚀 Local Development

### Prerequisites

- Python 3.11+
- MongoDB Atlas account (or local MongoDB)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ranagithubsaud236/Nova_Student_enrollment.git
   cd Nova_Student_enrollment
