import type { ValidationResult } from "../../Services/MBZValidator";

/**
 * Parsed world data from MBZ file
 */
export interface ParsedWorldData {
  worldID: number;
  worldName: string;
  worldFolder: string;
  elementCount: number;
  sizeInBytes: number;
  warnings: string[];
}

/**
 * Progress callback for MBZ parsing
 */
export type ProgressCallback = (
  current: number,
  total: number,
  status: string,
) => void;

/**
 * Port interface for MBZ parsing operations (wraps MBZImporter).
 * This interface allows the Application layer to parse MBZ files without depending on the Adapters layer.
 */
export default interface IMBZParserAdapter {
  /**
   * Parse and import an MBZ file into storage
   * @param file The MBZ file to parse
   * @param onProgress Optional callback for progress updates
   * @returns Parsed world data with metadata
   */
  parseMBZ(file: File, onProgress?: ProgressCallback): Promise<ParsedWorldData>;

  /**
   * Validate if a file is a valid MBZ file
   * Enhanced validation with detailed error reporting
   * @param file The file to validate
   * @returns Validation result with detailed errors and warnings
   */
  validateMBZ(file: File): Promise<ValidationResult>;
}
