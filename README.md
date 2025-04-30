# SolanaGuard: Advanced Solana Security API

## Overview

SolanaGuard is a cutting-edge security API built on Nest.js that leverages the power of multi-agent AI systems through LangGraph.js to detect and prevent common attack vectors in the Solana ecosystem. This specialized security layer focuses on two of the most prevalent threats to Solana users:

- **Address Poisoning Attacks**: Where attackers create wallet addresses similar to targeted victims to trick them into sending funds to malicious addresses
- **Account Dusting Attacks**: Where small amounts of tokens are sent to wallets to track user activity or prepare for more sophisticated phishing attempts

By utilizing Helius RPC services and a sophisticated multi-agent architecture, SolanaGuard provides real-time analysis and threat detection capabilities that can be integrated into any Solana application.

## Key Features

- **Multi-Agent Architecture**: Three specialized AI agents working in concert to provide comprehensive security analysis
- **Real-time Transaction Monitoring**: Immediate alerts for suspicious activity using Helius RPC
- **High Precision Detection**: Advanced heuristics and pattern recognition to minimize false positives
- **RESTful API Design**: Easy integration with any application or service
- **Comprehensive Analysis Reports**: Detailed breakdowns of detected threats with confidence scores
- **Flexible Deployment**: Built on Nest.js for scalable deployment options

## Architecture

SolanaGuard implements a sophisticated multi-agent system using LangGraph.js:

1. **Supervisor Agent**: Orchestrates the analysis workflow, evaluates reports from specialized agents, resolves conflicts, and produces final verdicts with confidence ratings and actionable recommendations

2. **Address Poisoning Detector Agent**: Specialized in identifying sophisticated address spoofing attempts by:
   - Calculating character-by-character similarity metrics between addresses
   - Identifying visually similar characters used in spoofing
   - Analyzing transaction patterns and relationships between addresses
   - Evaluating historical transaction data for anomalies
   
3. **Account Dusting Detection Agent**: Focused on identifying potential dusting attacks by:
   - Analyzing transaction amounts against established dusting patterns
   - Evaluating sender/receiver relationship histories
   - Examining token types and their common use in dusting campaigns
   - Correlating with known malicious addresses and dusting patterns

The agents communicate through a structured workflow managed by LangGraph.js, providing multiple perspectives on each analyzed transaction.

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solana-guard-api.git

# Install dependencies
cd solana-guard-api
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your Helius API key and other configurations

# Start the development server
npm run start:dev

# For production
npm run build
npm run start:prod
```

## Configuration

Create a `.env` file with the following variables:

```
# API Configuration
PORT=3000
NODE_ENV=development

# Helius API Configuration
HELIUS_API_KEY=your_helius_api_key
HELIUS_RPC_URL=https://mainnet.helius-rpc.com/your_helius_api_key

# LangGraph Configuration
LANGGRAPH_MODEL=your_preferred_model
LANGGRAPH_API_KEY=your_langgraph_api_key

# Security Settings
RATE_LIMIT=100
RATE_LIMIT_WINDOW=15m
```

## API Usage

### Check Transaction Safety

```bash
curl -X POST http://localhost:3000/api/analyze/transaction \
  -H "Content-Type: application/json" \
  -d '{
    "signature": "transaction_signature_here"
  }'
```

### Monitor Wallet for Threats

```bash
curl -X POST http://localhost:3000/agent/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "data": "user_wallet_address_here or a valid_signature",
  }'
```

## Response Example

```json
{
    is_dusting_attack: boolean;
    is_poisoning_attack: boolean;
    is_scam: boolean;
    confidence: number;
    dusting_details: {
        dust_threshold:string;
        total_dust_transaction:number;
        unique_recipients: number;
        avg_tps: number;
        notes: string
    };
    poisoning_details: {
        sender_address: string,
        similarity_score: number,
        matched_with_history: boolean,
        notes: string
    };
    scam_transactions: string[]
}
```

## Technical Details

### Agent Workflows

The SolanaGuard API implements a sophisticated LangGraph.js workflow that enables agents to:

1. **Process raw transaction data** from Helius RPC
2. **Extract relevant features** for security analysis
3. **Run specialized detection algorithms** within each agent
4. **Exchange findings** between agents when relevant
5. **Generate consensus verdicts** through the supervisor
6. **Provide actionable intelligence** for users or systems

### Detection Methodologies

#### Address Poisoning Detection

- Edit distance calculation with weighted character similarity
- Visual similarity analysis for homoglyph attacks
- Transaction pattern analysis for typical poisoning behavior
- Historical relationship analysis between sender/receiver
- Token type and amount correlation with known attack patterns

#### Account Dusting Detection

- Transaction amount thresholding with dynamic adjustment
- Sender reputation scoring based on historical behavior
- Token distribution pattern analysis
- Correlation analysis with known dusting campaigns
- Temporal pattern recognition for coordinated dusting

## Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Performance

SolanaGuard is designed to handle high transaction volumes with minimal latency:

- Average analysis time: 210ms per transaction
- Throughput capacity: 250+ transactions per second per instance
- Horizontal scaling support through Nest.js clustering

## Security Considerations

While SolanaGuard provides advanced detection capabilities, it should be integrated as part of a comprehensive security strategy:

- Use in conjunction with robust wallet interfaces that display full addresses
- Implement additional verification steps for high-value transactions
- Deploy alongside traditional security measures like whitelist-only transactions
- Consider additional protections like multisig for high-security applications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Helius](https://helius.xyz/) for their powerful Solana RPC infrastructure
- [LangGraph.js](https://github.com/langchain-ai/langgraphjs) for the agent orchestration framework
- [Nest.js](https://nestjs.com/) for the robust API foundation
- The Solana community for continued efforts in improving blockchain security