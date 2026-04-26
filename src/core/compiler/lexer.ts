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
  const segments = input.trim().split(/\s+/).filter(Boolean);

  return segments.map((segment, index) => ({
    type: index === 0 ? 'COMMAND' : segment.startsWith('--') ? 'FLAG' : 'ARGUMENT',
    value: segment,
    position: index,
  }));
}
