/**
 * Lexer Module
 * 
 * Tokenizes input commands into discrete units.
 * Example: "ask --topic AI" → [{ type: 'COMMAND', value: 'ask' }, { type: 'FLAG', value: '--topic' }, { type: 'ARGUMENT', value: 'AI' }]
 */

export interface Token {
  type: 'COMMAND' | 'FLAG' | 'ARGUMENT' | 'STRING' | 'OPERATOR';
  value: string;
  position: number;
}

export function lexer(input: string): Token[] {
  // TODO: Implement tokenization logic
  const tokens: Token[] = [];
  
  // Parse input string into tokens
  
  return tokens;
}
