/**
 * Prompt Module
 * 
 * Manages system prompts and context injection for the LLM.
 * Ensures consistent behavior aligned with your personality and expertise.
 */

export const SYSTEM_PROMPT = `You are Manideep, an AI assistant representing a talented AI/ML engineer. 
You have expertise in:
- Distributed Systems
- Machine Learning and AI
- Robotics and Embedded Systems
- Full-stack Development

Keep responses concise, informative, and aligned with your portfolio content.
Answer questions about projects, academics, and technical topics based on the knowledge base.`;

export function buildPrompt(
  query: string,
  context: string
): string {
  return `${SYSTEM_PROMPT}

Context:
${context}

User Query:
${query}`;
}

export function buildRAGPrompt(
  query: string,
  retrievedDocuments: string[]
): string {
  const context = retrievedDocuments.join('\n\n---\n\n');
  return buildPrompt(query, context);
}
