#!/usr/bin/env node

/**
 * Enhanced Expert Role Prompt MCP Server v2.0
 * Now with 50+ roles, CoT/ToT reasoning, and improved confidence scoring
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { 
  CallToolRequestSchema, 
  ListToolsRequestSchema 
} = require('@modelcontextprotocol/sdk/types.js');

// Import enhanced modules from src directory
const { EXPERT_ROLES_EXPANDED } = require('./src/expert-roles-expanded.js');
const { REASONING_FRAMEWORKS, ReasoningEngine } = require('./src/reasoning-frameworks.js');
const { ConfidenceScoring } = require('./src/confidence-scoring.js');

// Note: enhanced-keyword-mapping.js doesn't exist, creating stub
const WEIGHTED_KEYWORD_MAPPING = {};
const SEMANTIC_CLUSTERS = {};
const CATEGORY_KEYWORDS = {};
const COMMON_WORDS_PENALTY = [];

// Initialize modules
const reasoningEngine = new ReasoningEngine();
const confidenceScorer = new ConfidenceScoring();

// The server.js content continues from the local working version...
// This is a placeholder - need to get full content from local file