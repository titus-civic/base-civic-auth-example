"use client";

import { type ReactNode, useCallback, useState } from "react";
import { useUser } from "@civic/auth-web3/react";
import { useNotification } from "@coinbase/onchainkit/minikit";
import { useSignMessage, useAccount, useConnect } from "wagmi";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTab: (tab: string) => void;
};

export function Features({ setActiveTab }: FeaturesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Key Features">
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Minimalistic and beautiful UI design
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Responsive layout for all devices
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Dark mode support
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              OnchainKit integration
            </span>
          </li>
        </ul>
        <Button variant="outline" onClick={() => setActiveTab("home")}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
}

type HomeProps = {
  setActiveTab: (tab: string) => void;
};

export function Home({ setActiveTab }: HomeProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="My First Mini App">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          This is a minimalistic Mini App built with OnchainKit components.
        </p>
        <Button
          onClick={() => setActiveTab("features")}
          icon={<Icon name="arrow-right" size="sm" />}
        >
          Explore Features
        </Button>
      </Card>

      <TodoList />

      <TransactionCard />
    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn about MiniKit", completed: false },
    { id: 2, text: "Build a Mini App", completed: true },
    { id: 3, text: "Deploy to Base and go viral", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Card title="Get started">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
          />
          <Button
            variant="primary"
            size="md"
            onClick={addTodo}
            icon={<Icon name="plus" size="sm" />}
          >
            Add
          </Button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  id={`todo-${todo.id}`}
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    todo.completed
                      ? "bg-[var(--app-accent)] border-[var(--app-accent)]"
                      : "border-[var(--app-foreground-muted)] bg-transparent"
                  }`}
                >
                  {todo.completed && (
                    <Icon
                      name="check"
                      size="sm"
                      className="text-[var(--app-background)]"
                    />
                  )}
                </button>
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-[var(--app-foreground-muted)] cursor-pointer ${todo.completed ? "line-through opacity-70" : ""}`}
                >
                  {todo.text}
                </label>
              </div>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}


function TransactionCard() {
  const { user } = useUser();
  const { address, isConnected } = useAccount();
  const { signMessageAsync, isPending } = useSignMessage();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const [lastSignature, setLastSignature] = useState<string | null>(null);
  const sendNotification = useNotification();

  // Get the embedded wallet connector
  const embeddedWalletConnector = connectors.find(connector => 
    connector.name.toLowerCase().includes('embedded') || 
    connector.name.toLowerCase().includes('civic')
  );

  const handleConnectWallet = useCallback(async () => {
    if (!embeddedWalletConnector) {
      console.error("Embedded wallet connector not found");
      await sendNotification({
        title: "Wallet Error",
        body: "Embedded wallet connector not available.",
      });
      return;
    }

    try {
      await connect({ connector: embeddedWalletConnector });
      await sendNotification({
        title: "Wallet Connected! 🎉",
        body: "Embedded wallet connected successfully.",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      await sendNotification({
        title: "Connection Failed",
        body: "Failed to connect wallet. Please try again.",
      });
    }
  }, [embeddedWalletConnector, connect, sendNotification]);

  const handleSignTransaction = useCallback(async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (!isConnected || !address) {
      console.error("Wallet not connected");
      await sendNotification({
        title: "Wallet Not Connected",
        body: "Please connect your wallet to sign transactions.",
      });
      return;
    }
    
    try {
      // Create a simple message to sign
      const message = `Hello from ${user.name || user.email || 'Civic Auth User'}! This is a test message signed on ${new Date().toISOString()}`;
      
      // Use wagmi's signMessageAsync to sign the message
      const signature = await signMessageAsync({ message });
      setLastSignature(signature);
      
      console.log("Message signed:", message);
      console.log("Signature:", signature);
      console.log("Address:", address);
      
      await sendNotification({
        title: "Transaction Signed! 🎉",
        body: `Successfully signed message with wallet ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      
    } catch (error) {
      console.error("Error signing transaction:", error);
      await sendNotification({
        title: "Signing Failed",
        body: "Failed to sign the transaction. Please try again.",
      });
    }
  }, [user, isConnected, address, signMessageAsync, sendNotification]);

  return (
    <Card title="Sign EVM Transaction">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Experience the power of Civic Auth Web3 by signing a message. This demonstrates 
          EVM transaction signing capabilities with your Civic identity.
        </p>

        <div className="flex flex-col items-center space-y-4">
          {user ? (
            <>
              <div className="text-center">
                <p className="text-[var(--app-foreground-muted)] text-sm mb-2">
                  Signed in as: <span className="font-medium">{user.name || user.email}</span>
                </p>
                {user.id && (
                  <p className="text-[var(--app-foreground-muted)] text-xs mb-2">
                    User ID: {user.id}
                  </p>
                )}
                {isConnected && address && (
                  <p className="text-[var(--app-foreground-muted)] text-xs">
                    Wallet: {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                )}
              </div>
              
              {!isConnected ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleConnectWallet}
                  disabled={isConnecting || !embeddedWalletConnector}
                  className="min-w-[200px]"
                >
                  {isConnecting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    "Connect Embedded Wallet"
                  )}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSignTransaction}
                  disabled={isPending}
                  className="min-w-[200px]"
                >
                  {isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing...
                    </>
                  ) : (
                    "Sign Message"
                  )}
                </Button>
              )}
              
              {lastSignature && (
                <div className="mt-4 p-3 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)] max-w-full">
                  <p className="text-[var(--app-foreground-muted)] text-xs mb-1">Last Signature:</p>
                  <p className="text-[var(--app-foreground)] text-xs font-mono break-all">
                    {lastSignature}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <p className="text-yellow-400 text-sm mb-2">
                Sign in with Civic Auth to sign transactions
              </p>
              <p className="text-[var(--app-foreground-muted)] text-xs">
                Click the UserButton in the header to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
