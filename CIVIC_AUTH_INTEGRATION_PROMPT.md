# Civic Auth Integration Prompt for Base MiniApp

## Overview
Replace the traditional wallet connection in your Base MiniApp with Civic Auth for a seamless authentication experience. This integration allows users to sign in with their Civic identity instead of connecting wallets directly.

## Prerequisites
- Base MiniApp project created with `create-onchain --mini`
- Civic Auth account at [https://auth.civic.com](https://auth.civic.com)

## Step-by-Step Integration

### 1. Install Civic Auth Package
```bash
npm install @civic/auth
```

### 2. Set Up Environment Variables
Create a `.env.local` file in your project root:
```bash
# Get your Client ID from https://auth.civic.com after signing up
NEXT_PUBLIC_CIVIC_CLIENT_ID=your_civic_client_id_here

# Keep your existing OnchainKit variables
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_existing_api_key
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=your_existing_project_name
# ... other existing variables
```

### 3. Update Providers (`app/providers.tsx`)
Wrap your existing `MiniKitProvider` with `CivicAuthProvider`:

```tsx
"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { CivicAuthProvider } from "@civic/auth/react";

export function Providers(props: { children: ReactNode }) {
  return (
    <CivicAuthProvider clientId={process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || ""}>
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: "auto",
            theme: "mini-app-theme",
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
            logo: process.env.NEXT_PUBLIC_ICON_URL,
          },
        }}
      >
        {props.children}
      </MiniKitProvider>
    </CivicAuthProvider>
  );
}
```

### 4. Replace Wallet Connection in Main Page (`app/page.tsx`)
Replace the wallet connection imports and components:

**Remove these imports:**
```tsx
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
```

**Add this import:**
```tsx
import { UserButton } from "@civic/auth/react";
```

**Replace the wallet connection JSX:**
```tsx
// Replace this:
<Wallet className="z-10">
  <ConnectWallet>
    <Name className="text-inherit" />
  </ConnectWallet>
  <WalletDropdown>
    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
      <Avatar />
      <Name />
      <Address />
      <EthBalance />
    </Identity>
    <WalletDropdownDisconnect />
  </WalletDropdown>
</Wallet>

// With this:
<UserButton />
```

### 5. Update Components Using Wallet Context (`app/components/YourComponents.tsx`)
Replace `useAccount` with `useUser` from Civic Auth:

**Change imports:**
```tsx
// Remove:
import { useAccount } from "wagmi";

// Add:
import { useUser } from "@civic/auth/react";
```

**Update component logic:**
```tsx
// Replace:
const { address } = useAccount();

// With:
const { user } = useUser();

// Update conditional rendering:
// Replace: {address ? ... : ...}
// With: {user ? ... : ...}
```

### 6. Update Transaction Components
For transaction components, update the user context check:

```tsx
// Replace address-based logic:
const calls = useMemo(() => address ? [...] : [], [address]);

// With user-based logic:
const calls = useMemo(() => user ? [...] : [], [user]);

// Update UI messages:
// Replace: "Connect your wallet to send a transaction"
// With: "Sign in with Civic Auth to send a transaction"
```

## Key Benefits

- **Simplified UX**: Users sign in instead of connecting wallets
- **Identity Management**: Civic handles user authentication and profile
- **Web3 Ready**: Maintains Web3 capabilities through Civic's infrastructure
- **Professional**: Clean, modern authentication experience

## Testing the Integration

1. Start your development server: `npm run dev`
2. Click the "Sign In" button (replaces "Connect Wallet")
3. Complete the Civic Auth flow
4. Verify user information displays correctly
5. Test transaction functionality with authenticated users

## Troubleshooting

- **"Client ID not found"**: Ensure `NEXT_PUBLIC_CIVIC_CLIENT_ID` is set in `.env.local`
- **Build errors**: Run `npm install` to ensure all dependencies are installed
- **Authentication issues**: Verify your Civic Client ID is correct in the Civic dashboard

## What This Achieves

✅ Replaces wallet connection with Civic Auth sign-in  
✅ Maintains all existing MiniApp functionality  
✅ Provides seamless user authentication experience  
✅ Keeps Web3 capabilities through Civic's infrastructure  
✅ No breaking changes to existing app structure  

The integration is complete when users can sign in with Civic Auth and access all app features without traditional wallet connection.
