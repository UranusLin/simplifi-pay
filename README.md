# SimpliFi Pay

A regulatory-compliant Web3 payment system with user-owned KYC, privacy features, and seamless social login.

## Features

- User-owned KYC through Kinto
- Social login wallet creation
- Gasless transactions
- Privacy-preserving transactions
- Merchant tools (SDK/API)
- Cross-chain support

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, shadcn/ui
- **Smart Contracts**: Solidity, Hardhat, Viem
- **Infrastructure**: Turbo Monorepo
- **Key Integrations**: Kinto, Web3Auth, Biconomy, Fhenix, Circle

## Project Structure

```
simpli-fi/
├── packages/
│   ├── contracts/     # Smart contracts
│   ├── frontend/      # Next.js application
│   ├── sdk/           # Merchant SDK
│   └── common/        # Shared utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/simpli-fi.git

# Install dependencies
cd simpli-fi
pnpm install
```

### Environment Setup

Create `.env.local` in packages/frontend:

```env
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=
NEXT_PUBLIC_RPC_URL=
NEXT_PUBLIC_WALLET_CONNECT_ID=
```

### Development

```bash
# Start all packages in development mode
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

### Smart Contract Development

```bash
cd packages/contracts

# Compile contracts
pnpm build

# Run tests
pnpm test

# Deploy contracts
pnpm deploy
```

## Package Details

### @simplifi-pay/contracts

Core smart contracts including:
- SimpliFiWallet (Account Abstraction)
- SimpliFiPayment
- Privacy implementations

### @simplifi-pay/frontend

Next.js application with:
- User wallet interface
- Merchant dashboard
- Payment flows

### @simplifi-pay/sdk

Merchant integration tools:
- Payment processing
- Order management
- Analytics

### @simplifi-pay/common

Shared utilities and types used across packages.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a pull request

## Security

- Report vulnerabilities to [security@simpli-fi.com]
- Use testnet for development
- Never commit private keys

## License

MIT License - see LICENSE for details

## Contact

- Website: [simpli-fi.com]
- Email: [contact@simpli-fi.com]
- Twitter: [@SimpliFiPay]