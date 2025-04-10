# REUSE Platform

A comprehensive digital platform designed to reduce waste and optimize resource utilization across three interconnected solutions.

## Overview

REUSE addresses both business-to-business (B2B) and consumer needs through innovative approaches to resource sharing and waste reduction.

### Core Solutions:

1. **REUSE PRO** - B2B Equipment Marketplace
   - Share, sell, or donate unused equipment and assets
   - Find needed equipment at reduced costs
   - Connect with businesses in your area
   - Track environmental impact through resource sharing

2. **REUSE FOOD** - Food Waste Reduction App
   - Food retailers can sell products nearing expiration
   - Consumers find discounted food items nearby
   - Reduce food waste through smart distribution
   - Track the amount of food saved from waste

3. **REUSE LABEL** - Revalued Products Program
   - Labeling system for slightly damaged but functional products
   - Products sold at reduced prices to prevent waste
   - Promotes sustainable consumption
   - Reduces waste from unsold inventory

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: API routes in Next.js
- **Blockchain**: Ethereum Smart Contracts with Hardhat
- **Database**: (To be added in future phases)

## Development

### Getting Started

1. Clone the repository
2. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Set up the blockchain:
   ```bash
   cd blockchain
   npm install
   npx hardhat compile
   npx hardhat node
   ```

### Project Structure

- `/frontend`: Next.js application
- `/blockchain`: Smart contracts and deployment scripts
- `/docs`: Documentation files

## Development Phases

We are following an incremental development approach with seven phases:

1. Core Platform Setup
2. Business Profiles & Listings
3. Marketplace Features
4. Food Waste Integration
5. REUSE Label System
6. Analytics & Impact
7. Polish & Optimization

Please refer to the [PHASES.md](docs/PHASES.md) document for details on each development phase. 