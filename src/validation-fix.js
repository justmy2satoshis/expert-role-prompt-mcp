// Validation fix for expert-role-prompt
// This code will be integrated into server.js

// Helper function to normalize role IDs (convert underscores to hyphens)
function normalizeRoleId(roleId) {
  if (!roleId) return null;
  // Convert underscores to hyphens and lowercase
  return roleId.toLowerCase().replace(/_/g, '-').trim();
}

// Enhanced helper function to find expert by ID with normalization
function findExpertByIdEnhanced(expertId, EXPERT_ROLES_EXPANDED) {
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

module.exports = {
  normalizeRoleId,
  findExpertByIdEnhanced
};