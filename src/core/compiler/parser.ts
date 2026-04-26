export interface ParsedCommand {
  command: string;
  args: string[];
}

export function parseInput(input: string): ParsedCommand {
  // Simple Lexer: Split by spaces, ignoring extra whitespace
  const tokens = input.trim().split(/\s+/);
  
  return {
    command: tokens[0].toLowerCase(),
    args: tokens.slice(1),
  };
}
