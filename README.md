# HSLU Module Review DApp

## Project Idea (Draft)

This project develops a decentralized platform (DApp) for students of Hochschule Luzern (HSLU), to transparently, tamper-proof, and community-driven record module ratings/reviews. 
Blockchain technology ensures tamper-proof on-chain storage of reviews, while a community-based reputation system supports review quality.

## Motivation
- Lack of a transparent, and trustworthy module rating platform for HSLU students
- Enabling honest feedback for better study decisions
- Integration of blockchain to prevent manipulation and build trust with the help of a decentralized Community

## Core Features (planned)
- Decentralized storage of module ratings and workload/difficulty assessments
- Ability to upvote/downvote reviews
- Community-editable module descriptions (e.g via IPFS)
- User verification as HSLU students via email and issuance of a non-transferable NFT badge (Soul-Bound Token)
    - See also: https://www.coinbase.com/de/learn/crypto-glossary/what-are-soulbound-tokens-sbt
- Reputation tracking to prevent spam and abuse

## Technical Approach
- Development of smart contracts in Solidity using the [Remix IDE](https://remix.ethereum.org) as the main development tool
- Using the Polygon test network (Mumbai) for gas-efficient, fast transactions during development
- Planned Usage of IPFS or other alternative service for decentralized storage of module descriptions and other metadata 

## Next Steps for the development team
- Create and test smart contracts in Remix
- Define interfaces and events for module and review management
- Implement user verification and reputation logic
- Plan and realise  frontend and backend (If enough time is available)
