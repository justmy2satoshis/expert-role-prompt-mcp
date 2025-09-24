#!/usr/bin/env node

// Test the validation fix locally
const { EXPERT_ROLES_EXPANDED } = require('./src/expert-roles-expanded.js');

// Helper function to normalize role IDs (convert underscores to hyphens)
function normalizeRoleId(roleId) {
  if (!roleId) return null;
  // Convert underscores to hyphens and lowercase
  return roleId.toLowerCase().replace(/_/g, '-').trim();
}

// Helper function to find expert by ID with normalization
function findExpertById(expertId) {
  // Normalize the input ID
  const normalizedId = normalizeRoleId(expertId);

  // First try exact match with normalized ID
  for (const category of Object.values(EXPERT_ROLES_EXPANDED)) {
    if (category[normalizedId]) {
      return category[normalizedId];
    }
  }

  // Try variations if exact match fails
  const variations = [
    expertId, // Original
    expertId.replace(/-/g, '_'), // Try with underscores
    expertId.replace(/_/g, '-'), // Try with hyphens
    expertId.toLowerCase(), // Lowercase original
    expertId.toUpperCase() // Uppercase original
  ];

  for (const variant of variations) {
    for (const category of Object.values(EXPERT_ROLES_EXPANDED)) {
      if (category[variant]) {
        return category[variant];
      }
    }
  }

  return null;
}

// Test cases
const testCases = [
  'backend-engineer',  // Correct format
  'backend_engineer',  // Wrong format with underscore
  'Backend-Engineer',  // Case variation
  'BACKEND_ENGINEER',  // All caps with underscore
  'frontend-engineer', // Another valid role
  'frontend_engineer', // Wrong format
  'invalid-role-xyz'   // Should return null
];

console.log('Testing Expert Role Validation Fix\n');
console.log('=' .repeat(50));

testCases.forEach(testCase => {
  const result = findExpertById(testCase);
  console.log(`\nInput: "${testCase}"`);
  console.log(`Normalized: "${normalizeRoleId(testCase)}"`);
  console.log(`Found: ${result ? result.name : 'NOT FOUND'}`);
  console.log(`Status: ${result ? '✅ SUCCESS' : '❌ FAILED'}`);
});

console.log('\n' + '='.repeat(50));
console.log('\nSummary:');
console.log(`Successful: ${testCases.filter(t => findExpertById(t)).length}/${testCases.length}`);